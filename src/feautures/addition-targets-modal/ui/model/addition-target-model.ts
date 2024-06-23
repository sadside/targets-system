import { createQuery } from '@farfetched/core';
import { invoke } from '@withease/factories';
import { createEvent, createStore, sample } from 'effector';
import { ScriptMock } from 'pages/index-page/model/index-page-model.ts';
import { api } from 'shared/api/model/api.ts';
import { createSelect } from 'shared/ui/select/model/select-model.ts';
import { rowAdded } from 'widgets/script-timeline/model/script-timeline.ts';

export const getAllowedTargets = createQuery({
    handler: async (id: number): Promise<ScriptMock[]> => {
        const res = await api.get<ScriptMock[]>(`/scripts/${id}`);

        return res.data;
        // return [
        //     { id: 1, name: 'Мишень 1333' },
        //     { id: 2, name: 'Мишень 2' },
        //     { id: 3, name: 'Мишень 3' },
        // ];
    },
});

export const getAllowedGroups = createQuery({
    handler: async (id: number): Promise<ScriptMock[]> => {
        const res = await api.get<ScriptMock[]>(`/scripts/${id}`);

        return res.data;
        // return [
        //     { id: 1, name: 'Группа 1' },
        //     { id: 2, name: 'Группа 2' },
        //     { id: 3, name: 'Группа 3' },
        // ];
    },
});

export const modalStateChanged = createEvent<boolean>();
export const buttonClicked = createEvent();

export const $isVisible = createStore(false).on(
    modalStateChanged,
    (_, newState) => newState,
);

export const targetsSelectModel = invoke(
    createSelect<ScriptMock, 'name'>,
    {
        renderField: 'name',
    },
);

export const groupsSelectModel = invoke(
    createSelect<ScriptMock, 'name'>,
    {
        renderField: 'name',
    },
);

sample({
    //@ts-ignore
    clock: modalStateChanged,
    filter: modalState => modalState,
    target: [getAllowedTargets.start, getAllowedGroups.start],
});

sample({
    clock: getAllowedTargets.finished.success.map(
        data => data.result,
    ),
    target: targetsSelectModel.$items,
});

sample({
    clock: getAllowedGroups.finished.success.map(data => data.result),
    target: groupsSelectModel.$items,
});

sample({
    clock: targetsSelectModel.itemSelected,
    target: groupsSelectModel.reset,
});

sample({
    clock: groupsSelectModel.itemSelected,
    target: targetsSelectModel.reset,
});

sample({
    clock: buttonClicked,
    source: targetsSelectModel.$selectedItem,
    filter: selected => selected != null,
    fn: selected => ({
        //@ts-ignore
        id: selected.id,
    }),
    target: rowAdded,
});

sample({
    clock: buttonClicked,
    source: groupsSelectModel.$selectedItem,
    filter: selected => selected != null,
    fn: selected => ({
        //@ts-ignore
        id: selected.id,
    }),
    target: rowAdded,
});

sample({
    clock: rowAdded,
    fn: () => false,
    target: $isVisible,
});

sample({
    clock: rowAdded,
    target: [
        targetsSelectModel.$selectedItem.reinit,
        groupsSelectModel.$selectedItem.reinit,
    ],
});

// TODO УДАДЕНИЕ ВСЕХ ИВЕНТОВ
