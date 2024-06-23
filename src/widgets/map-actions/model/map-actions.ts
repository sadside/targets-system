import { reliefGate } from '@/feautures/relief-select/model/relief-select.ts';
import { createQuery } from '@farfetched/core';
import { invoke } from '@withease/factories';
import { createEvent, createStore, sample } from 'effector';
import { Target } from 'entities/target/api/target-api.ts';
import { ScriptMock } from 'pages/index-page/model/index-page-model.ts';
import { api } from 'shared/api/model/api.ts';
import { createSelect } from 'shared/ui/select/model/select-model.ts';
import {
    FIGURE_TYPES,
    ReliefData,
} from 'widgets/editor-map/model/editor-map-model.ts';

interface MapItem {
    id: number;
    name: string;
}

export interface Map {
    id: number;
    name: string;
    relief: ReliefData[];
}

export enum MAP_EDIT_MODE {
    CREATE = 'create',
    EDIT = 'edit',
}

export const mapSaved = createEvent();
export const mapCreated = createEvent();

export const getAllMaps = createQuery({
    handler: async () => {
        const { data } = await api.get<ScriptMock[]>('/map/');

        return data;

        // const mock: MapItem[] = [
        //     {
        //         id: 1,
        //         name: 'Карта 33',
        //     },
        //     {
        //         id: 2,
        //         name: 'Карта 2',
        //     },
        //     {
        //         id: 3,
        //         name: 'Карта 3',
        //     },
        //     {
        //         id: 4,
        //         name: 'Карта 4',
        //     },
        // ];
        //
        // return mock;
    },
});

// export const getAllFreeTargets = createQuery({
//     handler: async () => {
//         return new Promise(resolve =>
//             setTimeout(() => {
//                 resolve(targetsMock);
//             }, 2000),
//         ).then(data => data as Target[]);
//     },
// });

// export const getFreeTargetsForCurrentMap = createQuery({
//     handler: async (id: number) => {
//         console.log(id);
//         return new Promise(
//             resolve =>
//                 setTimeout(() => {
//                     resolve(targetsMock);
//                 }, 2000),
//             //@ts-ignore
//         ).then(data => data.slice(10, 15) as Target[]);
//     },
// });

export const getMapById = createQuery({
    handler: async (id: number): Promise<Map> => {
        const { data } = await api.get<Map>(`/map/${id}`);

        return data;
    },
});

export const postMapQuery = createQuery({
    handler: async (map: Map) => {
        return await api.post(`/map/${map.id}`, map);
    },
});

interface MapData {
    name: string;
    relief: ReliefData[];
}

export const createMap = createQuery({
    handler: async (map: MapData) => {
        console.log(map);
        await api.post('/map/', map);
    },
});

export const mapModeSelected = createEvent<MAP_EDIT_MODE | null>();
export const mapNameInputChanged = createEvent<string>();
export const mapModeReseted = createEvent<void>();
export const targetAddBtnClicked = createEvent();
export const mapCreateBtnClicked = createEvent();
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
    clock: reliefGate.close,
    target: $mapName.reinit,
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

// sample({
//     clock: allTargetsSelect.gate.open,
//     target: getAllFreeTargets.refresh,
// });

// sample({
//     clock: mapSelect.itemSelected,
//     fn: selectedMap => selectedMap.id,
//     target: getFreeTargetsForCurrentMap.refresh,
// });

sample({
    clock: mapSelect.gate.open,
    target: mapSelect.$selectedItem.reinit,
});

// sample({
//     clock: getAllFreeTargets.$pending,
//     target: allTargetsSelect.$loading,
// });
//
// sample({
//     clock: getFreeTargetsForCurrentMap.$pending,
//     target: targetsForMapSelect.$loading,
// });

// sample({
//     clock: allTargetsSelect.gate.open,
//     target: getAllFreeTargets.refresh,
// });

sample({
    clock: getAllMaps.$finished,
    source: getAllMaps.$data,
    target: mapSelect.$items,
});

// sample({
//     clock: getAllFreeTargets.$finished,
//     source: getAllFreeTargets.$data,
//     target: allTargetsSelect.$items,
// });

// sample({
//     clock: getFreeTargetsForCurrentMap.$finished,
//     source: getFreeTargetsForCurrentMap.$data,
//     target: targetsForMapSelect.$items,
// });

sample({
    clock: allTargetsSelect.gate.close,
    fn: () => '',
    target: $mapName,
});

// sample({
//     clock: mapCreateBtnClicked,
//     source: {
//         relief: $mapItems,
//         name: $mapName,
//     },
//     fn: ({ relief, name }) => {
//         return {
//             name,
//             relief: relief.map(item => ({
//                 ...item.data,
//                 id: item.id,
//             })),
//         };
//     },
//     target: createMap.start,
// });

sample({
    clock: createMap.finished.success,
    fn: () => null,
    target: mapModeSelected,
});

sample({
    clock: createMap.finished.success,
    target: getAllMaps.start,
});
