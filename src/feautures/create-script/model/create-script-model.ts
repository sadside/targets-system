import { createQuery } from '@farfetched/core';
import { invoke } from '@withease/factories';
import { ItemDefinition } from 'dnd-timeline';
import { createEvent, createStore, sample } from 'effector';
import {
    ScriptMock,
    getAllScriptsQuery,
} from 'pages/index-page/model/index-page-model.ts';
import { Node } from 'reactflow';
import { api } from 'shared/api/model/api.ts';
import { createModal } from 'shared/utils/factories/modal-factory.ts';
import { selectScriptModel } from 'widgets/script-actions/model/script-action.ts';
import { $targets } from 'widgets/script-map/model/script-map-model.ts';
import {
    $timelineEvents,
    Event,
} from 'widgets/script-timeline/model/script-timeline.ts';

const createScriptModal = invoke(createModal, {
    initialValue: false,
});

export const {
    $isModalVisible,
    modalClosed,
    modalChanged,
    modalOpened,
} = createScriptModal;

export const createScript = createQuery({
    handler: async (scriptName: string) => {
        await api.post('/scripts/', { name: scriptName });
    },
});

interface ScriptSaveData {
    id: number;
    targets: CustomTarget[];
    events: Event[];
}

export const saveScriptQuery = createQuery({
    handler: async (data: ScriptSaveData) => {
        // сохранение измененных мишеней
        await api.post(`url/?id=${data.id}`, data.targets);

        //Сохранение измененного таймлайна
        await api.post(`url/?id=${data.id}`, data.events);
    },
});

export const deleteScriptQuery = createQuery({
    handler: async (id: number) => {
        await api.delete(`scripts/${id}`);
    },
});

export const inputChanged = createEvent<string>();
export const formSubmitted = createEvent();
export const scriptSaved = createEvent();
export const scriptRemoved = createEvent();

export const $scriptName = createStore<string>('');

$scriptName.on(inputChanged, (_, payload) => payload);

sample({
    clock: formSubmitted,
    source: $scriptName,
    target: createScript.start,
});

sample({
    clock: createScript.finished.success,
    target: [modalClosed, getAllScriptsQuery.start],
});

sample({
    clock: scriptSaved,
    source: {
        targets: $targets,
        events: $timelineEvents,
        selectedScript: selectScriptModel.$selectedItem,
    },
    filter: ({ selectedScript }) => selectedScript != null,
    fn: ({ targets, events, selectedScript }) => {
        const originalEvents = events.map(mapToOriginalEvent);
        const originalTargets = targets.map(mapToOriginalTarget);
        const id = selectedScript?.id || 0;

        return {
            id,
            targets: originalTargets,
            events: originalEvents,
        };
    },
    target: saveScriptQuery.start,
});

sample({
    clock: scriptRemoved,
    source: selectScriptModel.$selectedItem,
    filter: (selectedScript): selectedScript is ScriptMock =>
        selectedScript != null,
    fn: selectedScript => selectedScript?.id || -1,
    target: deleteScriptQuery.start,
});

function mapToOriginalEvent(item: ItemDefinition): Event {
    // Пример конвертации строки rowId в числовые значения targetId и groupId
    const [targetIdStr, groupIdStr] = item.rowId.split('-');
    const targetId = parseInt(targetIdStr, 10);
    const groupId = parseInt(groupIdStr, 10);

    return {
        id: parseInt(item.id, 10),
        targetId: targetId,
        groupId: groupId,
        timeStart: item.relevance.start.toISOString(),
        timeEnd: item.relevance.end.toISOString(),
        individual: groupIdStr == '0', // Пример использования поля disabled
    };
}

export interface CustomTarget {
    id: number;
    name: string;
    posX: number;
    posY: number;
}

function mapToOriginalTarget(node: Node): CustomTarget {
    return {
        id: node.data.id,
        name: node.data.name,
        posX: node.position.x,
        posY: node.position.y,
    };
}
