import { createQuery } from '@farfetched/core';
import { invoke } from '@withease/factories';
import { createEvent, createStore, sample } from 'effector';
import {
    Target,
    targetsMock,
} from 'entities/target/api/target-api.ts';
import { createSelect } from 'shared/ui/select/model/select-model.ts';
import { FIGURE_TYPES } from 'widgets/editor-map/model/editor-map-model.ts';

interface MapItem {
    id: number;
    name: string;
}

export enum MAP_EDIT_MODE {
    CREATE = 'create',
    EDIT = 'edit',
}

export const getAllMaps = createQuery({
    handler: async () => {
        // const { data } = await api.get<MapItem[]>('');

        const mock: MapItem[] = [
            {
                id: 1,
                name: 'Карта 1',
            },
            {
                id: 2,
                name: 'Карта 2',
            },
            {
                id: 3,
                name: 'Карта 3',
            },
            {
                id: 4,
                name: 'Карта 4',
            },
        ];

        return mock;
    },
});

export const getAllFreeTargets = createQuery({
    handler: async () => {
        return new Promise(resolve =>
            setTimeout(() => {
                resolve(targetsMock);
            }, 2000),
        ).then(data => data as Target[]);
    },
});

export const getFreeTargetsForCurrentMap = createQuery({
    handler: async (id: number) => {
        console.log(id);
        return new Promise(
            resolve =>
                setTimeout(() => {
                    resolve(targetsMock);
                }, 2000),
            //@ts-ignore
        ).then(data => data.slice(10, 15) as Target[]);
    },
});

export const mapModeSelected = createEvent<MAP_EDIT_MODE>();
export const mapNameInputChanged = createEvent<string>();
export const mapModeReseted = createEvent<void>();
export const targetAddBtnClicked = createEvent();
export const reliefAddBtnClicked = createEvent<FIGURE_TYPES>();

export const $mapEditMode = createStore<MAP_EDIT_MODE | null>(
    null,
).reset(mapModeReseted);
export const $mapName = createStore<string>('');

export const allTargetsSelect = invoke(createSelect<Target, 'name'>, {
    renderField: 'name',
});

export const targetsForMapSelect = invoke(
    createSelect<Target, 'name'>,
    {
        renderField: 'name',
    },
);

export const mapSelect = invoke(createSelect<MapItem, 'name'>, {
    renderField: 'name',
});

sample({
    clock: mapNameInputChanged,
    target: $mapName,
});

sample({
    clock: mapModeSelected,
    target: $mapEditMode,
});

sample({
    clock: mapSelect.gate.open,
    target: getAllMaps.refresh,
});

sample({
    clock: allTargetsSelect.gate.open,
    target: getAllFreeTargets.refresh,
});

sample({
    clock: mapSelect.itemSelected,
    fn: selectedMap => selectedMap.id,
    target: getFreeTargetsForCurrentMap.refresh,
});

sample({
    clock: getAllFreeTargets.$pending,
    target: allTargetsSelect.$loading,
});

sample({
    clock: getFreeTargetsForCurrentMap.$pending,
    target: targetsForMapSelect.$loading,
});

sample({
    clock: allTargetsSelect.gate.open,
    target: getAllFreeTargets.refresh,
});

sample({
    clock: getAllMaps.$finished,
    source: getAllMaps.$data,
    target: mapSelect.$items,
});

sample({
    clock: getAllFreeTargets.$finished,
    source: getAllFreeTargets.$data,
    target: allTargetsSelect.$items,
});

sample({
    clock: getFreeTargetsForCurrentMap.$finished,
    source: getFreeTargetsForCurrentMap.$data,
    target: targetsForMapSelect.$items,
});

sample({
    clock: allTargetsSelect.gate.close,
    fn: () => '',
    target: $mapName,
});
