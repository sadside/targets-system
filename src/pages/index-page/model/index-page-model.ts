import { createQuery } from '@farfetched/core';
import { invoke } from '@withease/factories';
import { combine, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import {
    Music,
    ShotSensorType,
    TARGET_TYPE,
    Target,
} from 'entities/target/api/target-api.ts';
import { TargetType } from 'pages/index-page/types.ts';
import { combineEvents, interval } from 'patronum';
import { Node } from 'reactflow';
import { api } from 'shared/api/model/api.ts';
import { createSelect } from 'shared/ui/select/model/select-model.ts';
import { ReliefData } from 'widgets/editor-map/model/editor-map-model.ts';

export interface TargetGroup {
    name: string | null;
    targets: TargetType[];
}

export interface Map {
    id: number;
    name: string;
    relief: ReliefData[];
}

export enum SCRIPT_STATUSES {
    STOPPED = 'Не запущен',
    STARTED = 'Запущен',
    PAUSED = 'Приостановлен',
}

export interface Script {
    id: number;
    name: string;
    status: SCRIPT_STATUSES;
    startTime: Date | null;
    currentTime: Date | null;
    currentMap?: Map;
}

export type ScriptMock = {
    id: number;
    name: string;
};

export interface Group {
    id: number;
    name: string;
    colour: string;
    shotToDie: number;
    navi: boolean;
    posX: number;
    posY: number;
    type: TARGET_TYPE;
    music: Music;
    fire: boolean;
    moveSensor: boolean;
    shotSensorType: ShotSensorType;
    valueSensor: number;
    goAfterDestroy: boolean;
    heater: boolean;
    targets: Target[];
}

export const indexGate = createGate();
export const scriptStarted = createEvent();
export const scriptStopped = createEvent();
export const scriptRestarted = createEvent();
export const scriptPaused = createEvent();
export const scriptContinued = createEvent();
export const scriptSubmitted = createEvent();
export const targetsReloaded = createEvent();

export const getCurrentMap = createQuery({
    handler: async () => {
        const res = await api.get<Script>(`/scripts/statuses`);

        return res.data;
    },
});

export const getCurrentScript = createQuery({
    handler: async () => {
        // await new Promise(resolve => setTimeout(resolve, 2000));

        const res = await api.get<Script>(`/scripts/statuses`);

        return res.data;

        // return {
        //     id: 1,
        //     name: 'Тестовый',
        //     status: SCRIPT_STATUSES.STOPPED,
        //     startTime: null,
        //     currentMap: {
        //         id: 1,
        //         name: 'Стандартная карта',
        //         relief: [
        //             {
        //                 id: 2231,
        //                 name: 'Озеро',
        //                 figure: FIGURE_TYPES.CIRCLE,
        //                 height: 100,
        //                 width: 333,
        //                 posX: 222,
        //                 posY: 33,
        //                 color: '#ccc',
        //             },
        //             {
        //                 id: 123,
        //                 name: 'Здание',
        //                 figure: FIGURE_TYPES.RECTANGLE,
        //                 height: 200,
        //                 width: 1000,
        //                 posX: 300,
        //                 posY: 100,
        //                 color: '#61aeef',
        //             },
        //             {
        //                 id: 4555,
        //                 name: 'Озеро 22',
        //                 figure: FIGURE_TYPES.CIRCLE,
        //                 height: 100,
        //                 width: 100,
        //                 posX: 633,
        //                 posY: 400,
        //                 color: '#61aeef',
        //             },
        //         ],
        //     },
        // } as Script;
    },
});

export const postSelectedScript = createQuery({
    handler: async (id: number) => {
        await api.post(`/scripts/current?id=${id}`);

        // await new Promise(resolve => setTimeout(resolve, 2000));
        // return {
        //     id: 2,
        //     name: 'Сценарий 2',
        //     status: SCRIPT_STATUSES.STOPPED,
        //     startTime: null,
        // } as Script;
    },
});

export const continueScriptQuery = createQuery({
    handler: async () => {
        await api.post(`/scripts/current?cmd=CONTINUE`);

        // return {
        //     id: 1,
        //     name: 'Тестовый',
        //     status: SCRIPT_STATUSES.STARTED,
        //     startTime: null,
        // } as Script;
    },
});

export const startScriptQuery = createQuery({
    handler: async () => {
        await api.post(`/scripts/current?cmd=START`);
        // return {
        //     id: 1,
        //     name: 'Тестовый',
        //     status: SCRIPT_STATUSES.STARTED,
        //     startTime: null,
        // } as Script;
    },
});

export const getAllScriptsQuery = createQuery({
    handler: async (): Promise<ScriptMock[]> => {
        const res = await api.get<ScriptMock[]>('/scripts/');

        return res.data;
        // return [
        //     { id: 1, name: 'Тестовый22' },
        //     { id: 2, name: 'Сценарий 2' },
        //     { id: 3, name: 'Сценарий 3' },
        // ];
    },
});

export const getAllMapsQuery = createQuery({
    handler: async (): Promise<ScriptMock[]> => {
        const res = await api.get<ScriptMock[]>('/map/');

        return res.data;
        // return [
        //     { id: 1, name: 'Стандартная карт22а' },
        //     { id: 2, name: 'Зимняя карта' },
        //     { id: 3, name: 'Лесная карта' },
        // ];
    },
});

export const getScriptGroupsQuery = createQuery({
    handler: async () => {
        // TODO поменять юрл
        const res = await api.get<Group[]>('ЮРЛ групп сценария');

        return res.data;

        // const targets: Target[] = [
        //     {
        //         id: 1,
        //         groupId: '1',
        //         name: 'Статичная мишень',
        //         shotToDie: 1,
        //         navi: true,
        //         posX: 100,
        //         posY: 200,
        //         type: TARGET_TYPE.Middle,
        //         music: Music.None,
        //         fire: true,
        //         pointer: true,
        //         moveSensor: true,
        //         shotSensorType: ShotSensorType.SENSOR1,
        //         valueSensor: 1,
        //         status: TARGET_STATUSES.ONLINE_IDLE,
        //         batteryLevel: 100,
        //         position: 'UP',
        //         state: TARGET_STATES.NO_ACTIVE,
        //         image: '',
        //     },
        //     {
        //         id: 2,
        //         groupId: '1',
        //         name: 'Тестовая мишень',
        //         shotToDie: 2,
        //         navi: false,
        //         posX: 450,
        //         posY: 666,
        //         type: TARGET_TYPE.Little,
        //         music: Music.None,
        //         fire: false,
        //         pointer: false,
        //         moveSensor: false,
        //         shotSensorType: ShotSensorType.SENSOR1,
        //         valueSensor: 2,
        //         status: TARGET_STATUSES.OFFLINE_IN_PROGRESS,
        //         batteryLevel: 50,
        //         position: 'DOWN',
        //         state: TARGET_STATES.ACTIVE,
        //         image: '',
        //     },
        // ];
        // return [
        //     {
        //         id: 1,
        //         name: 'Group 1',
        //         colour: '#024eea',
        //         targets: targets,
        //     },
        //     {
        //         id: 2,
        //         name: 'Group 2',
        //         colour: '#c6ff00',
        //         targets: [],
        //     },
        // ] as Group[];
    },
});

export const getScriptTargetsWithoutGroup = createQuery({
    handler: async () => {
        // TODO поменять юрл
        const res = await api.get<Target[]>('ЮРЛ мишеней без групп');

        return res.data;

        // return [
        //     {
        //         id: 3,
        //         groupId: '',
        //         name: 'Тестовая',
        //         shotToDie: 3,
        //         navi: false,
        //         posX: 390,
        //         posY: 700,
        //         type: TARGET_TYPE.Little,
        //         music: Music.None,
        //         fire: false,
        //         pointer: false,
        //         moveSensor: false,
        //         shotSensorType: ShotSensorType.SENSOR1,
        //         valueSensor: 3,
        //         status: TARGET_STATUSES.ONLINE_IDLE,
        //         batteryLevel: 75,
        //         position: 'UP',
        //         state: TARGET_STATES.KILLED,
        //         image: '',
        //     },
        //     {
        //         id: 4,
        //         groupId: '',
        //         name: 'Сделал фронт не в сроки',
        //         shotToDie: 4,
        //         navi: true,
        //         posX: 450,
        //         posY: 222,
        //         type: TARGET_TYPE.Little,
        //         music: Music.None,
        //         fire: true,
        //         pointer: true,
        //         moveSensor: true,
        //         shotSensorType: ShotSensorType.SENSOR1,
        //         valueSensor: 4,
        //         status: TARGET_STATUSES.OFFLINE_IDLE,
        //         batteryLevel: 25,
        //         position: 'DOWN',
        //         state: TARGET_STATES.NO_CONNECT,
        //         image: '',
        //     },
        // ] as Target[];
    },
});

export const getFreeTargets = createQuery({
    handler: async () => {
        // TODO поменять юрл
        const res = await api.get<Target[]>('ЮРЛ СВОБОДНЫХ МИШЕНЕЙ');

        return res.data;

        // return [
        //     {
        //         id: 5,
        //         groupId: '',
        //         name: 'Сделал бек не в сроки',
        //         shotToDie: 5,
        //         navi: true,
        //         posX: 100,
        //         posY: 111,
        //         type: TARGET_TYPE.Little,
        //         music: Music.None,
        //         fire: true,
        //         pointer: true,
        //         moveSensor: true,
        //         shotSensorType: ShotSensorType.SENSOR1,
        //         valueSensor: 5,
        //         status: TARGET_STATUSES.ONLINE_IN_PROGRESS,
        //         batteryLevel: 50,
        //         position: 'UP',
        //     },
        //     {
        //         id: 6,
        //         groupId: '',
        //         name: 'Мишень номер 2',
        //         shotToDie: 6,
        //         navi: false,
        //         posX: 990,
        //         posY: 123,
        //         type: TARGET_TYPE.Little,
        //         music: Music.None,
        //         fire: false,
        //         pointer: false,
        //         moveSensor: false,
        //         shotSensorType: ShotSensorType.SENSOR3,
        //         valueSensor: 6,
        //         status: TARGET_STATUSES.ONLINE_IN_PROGRESS,
        //         batteryLevel: 75,
        //         position: 'DOWN',
        //     },
        // ] as Target[];
    },
});

export const getMapById = createQuery({
    handler: async (id: number): Promise<Map> => {
        const res = await api.get<Map>(`/map/${id}`);

        return res.data;
        // await new Promise(resolve => setTimeout(resolve, 500));
        // return {
        //     id: 2,
        //     name: 'Зимняя карта',
        //     relief: [
        //         {
        //             id: 122,
        //             name: 'Озеро',
        //             figure: FIGURE_TYPES.CIRCLE,
        //             height: 100,
        //             width: 100,
        //             posX: 300,
        //             posY: 400,
        //             color: '#2d2222',
        //         },
        //         {
        //             id: 233,
        //             name: 'Здание',
        //             figure: FIGURE_TYPES.RECTANGLE,
        //             height: 200,
        //             width: 300,
        //             posX: 300,
        //             posY: 100,
        //             color: '#00bbff',
        //         },
        //         {
        //             id: 3444,
        //             name: 'Озеро 22',
        //             figure: FIGURE_TYPES.CIRCLE,
        //             height: 100,
        //             width: 100,
        //             posX: 633,
        //             posY: 400,
        //             color: '#ff001b',
        //         },
        //     ],
        // };
    },
});

export const upAllTargets = createQuery({
    handler: async () => {
        await api.get(`/targets?cmd=UP`);
    },
});

export const downAllTargets = createQuery({
    handler: async () => {
        await api.get(`/targets?cmd=DOWN`);
    },
});

export const upTargetBtnClicked = createEvent<number>();
export const downTargetBtnClicked = createEvent<number>();

export const upTarget = createQuery({
    handler: async id => {
        await api.get(`/targets/${id}?cmd=UP`);
    },
});

export const downTarget = createQuery({
    handler: async (id: number) => {
        await api.get(`/targets/${id}?cmd=DOWN`);
    },
});

sample({
    clock: upTargetBtnClicked,
    target: upTarget.start,
});

sample({
    clock: downTargetBtnClicked,
    target: downTarget.start,
});

export const stopScriptQuery = createQuery({
    handler: async () => {
        await api.post(`/scripts/current?cmd=STOP`);
        // return {
        //     id: 1,
        //     name: 'Тестовый',
        //     status: SCRIPT_STATUSES.STOPPED,
        //     startTime: null,
        // } as Script;
    },
});

export const restartScriptQuery = createQuery({
    handler: async () => {
        await api.post(`/scripts/current?cmd=RELOAD`);
        // return {
        //     id: 1,
        //     name: 'Тестовый',
        //     status: SCRIPT_STATUSES.STARTED,
        //     startTime: null,
        // } as Script;
    },
});

export const pauseScriptQuery = createQuery({
    handler: async () => {
        await api.post(`/scripts/current?cmd=PAUSE`);
        // return {
        //     id: 1,
        //     name: 'Тестовый',
        //     status: SCRIPT_STATUSES.PAUSED,
        //     startTime: null,
        // } as Script;
    },
});

export const $currentScriptTargets = createStore<
    (Target | { color: string })[] | null
>(null);

export const $currentScript = createStore<Script | null>(null);

const scriptTargetsLoaded = combineEvents([
    getScriptGroupsQuery.finished.success,
    getScriptTargetsWithoutGroup.finished.success,
]);

sample({
    clock: indexGate.open,
    target: [
        getCurrentScript.refresh,
        getAllScriptsQuery.start,
        getAllMapsQuery.start,
    ],
});

sample({
    clock: getCurrentScript.finished.finally,
    target: getFreeTargets.refresh,
});

sample({
    clock: [
        getCurrentScript.finished.success,
        targetsReloaded,
        downTarget.finished.success,
        upTarget.finished.success,
        upAllTargets.finished.success,
        downAllTargets.finished.success,
    ],
    target: [
        getScriptGroupsQuery.refresh,
        getScriptTargetsWithoutGroup.refresh,
    ],
});

sample({
    clock: scriptTargetsLoaded,
    source: {
        groups: getScriptGroupsQuery.$data,
        targets: getScriptTargetsWithoutGroup.$data,
    },
    fn: ({ groups, targets }) => {
        return collectTargetsForMap(groups, targets);
    },
    target: $currentScriptTargets,
});

export const $currentMap = createStore<Map | null>(null);
export const $mapReliefItems = $currentMap.map(convertReliefToNodes);

sample({
    clock: getMapById.finished.success,
    fn: res => res.result,
    target: $currentMap,
});

sample({
    //@ts-ignore
    clock: getCurrentScript.finished.success,
    filter: script => Boolean(script.result.currentMap),
    fn: script => script.result.currentMap,
    target: $currentMap,
});

export const $nodesFromTargets = combine(
    $currentScriptTargets,
    convertTargetsToNodes,
);

export const selectScriptModel = invoke(
    createSelect<ScriptMock, 'name'>,
    { renderField: 'name' },
);

export const selectMapModel = invoke(
    createSelect<ScriptMock, 'name'>,
    { renderField: 'name' },
);

export const $allMapObjects = combine(
    $mapReliefItems,
    $nodesFromTargets,
    (reliefItems, targets) => [...reliefItems, ...targets],
);

sample({
    clock: getCurrentScript.finished.success,
    fn: script =>
        ({
            id: script.result.id,
            name: script.result.name,
        }) as ScriptMock,
    target: selectScriptModel.$selectedItem,
});

sample({
    clock: $currentMap,
    filter: map => Boolean(map),
    target: selectMapModel.$selectedItem,
});

sample({
    clock: scriptSubmitted,
    source: selectScriptModel.$selectedItem,
    filter: selectedScript => selectedScript !== null,
    //@ts-ignore
    fn: script => script.id,
    target: postSelectedScript.start,
});

sample({
    clock: scriptStarted,
    target: startScriptQuery.start,
});

sample({
    clock: selectMapModel.itemSelected,
    // source: selectMapModel.$selectedItem,
    filter: (map): map is Map => map != null,
    fn: (map: ScriptMock) => map.id,
    target: getMapById.start,
});

const { tick } = interval({
    timeout: 1000,
    //@ts-ignore
    start: [
        scriptStarted,
        scriptContinued,
        restartScriptQuery.finished.success,
    ],
    stop: [scriptStopped, scriptPaused],
});

sample({
    clock: tick,
    source: $currentScript,
    filter: (script): script is Script => script !== null,
    fn: script => {
        const incrementedDate = script?.currentTime
            ? script?.currentTime.getTime() + 1000
            : new Date().getTime();

        return {
            ...script,
            currentTime: new Date(incrementedDate),
        } as Script;
    },
    target: $currentScript,
});

sample({
    clock: scriptStopped,
    target: stopScriptQuery.start,
});

sample({
    clock: scriptRestarted,
    target: restartScriptQuery.start,
});

sample({
    clock: scriptPaused,
    source: $currentScript,
    filter: (script): script is Script => script !== null,
    fn: script =>
        ({
            ...script,
            status: SCRIPT_STATUSES.PAUSED,
        }) as Script,
    target: $currentScript,
});

sample({
    clock: scriptContinued,
    source: $currentScript,
    filter: (script): script is Script => script !== null,
    fn: script =>
        ({
            ...script,
            status: SCRIPT_STATUSES.STARTED,
        }) as Script,
    target: $currentScript,
});

sample({
    clock: getCurrentScript.finished.success,
    fn: result => result.result,
    target: $currentScript,
});

sample({
    clock: getCurrentScript.finished.success,
    target: [getAllScriptsQuery.start, getAllMapsQuery.start],
});

sample({
    clock: getAllScriptsQuery.$pending,
    target: selectScriptModel.$loading,
});

sample({
    clock: getAllMapsQuery.$pending,
    target: selectMapModel.$loading,
});

sample({
    clock: [
        getAllScriptsQuery.finished.success,
        selectScriptModel.itemSelected,
        $currentScript,
    ],
    source: {
        currentScript: $currentScript,
        allScripts: getAllScriptsQuery.$data,
    },
    fn: ({ currentScript, allScripts }) => {
        if (currentScript && allScripts) {
            return allScripts.filter(
                script => script.id !== currentScript.id,
            );
        } else {
            return allScripts;
        }
    },
    target: selectScriptModel.$items,
});

sample({
    clock: [
        getAllMapsQuery.finished.success,
        getMapById.finished.success,
        selectMapModel.itemSelected,
    ],
    source: {
        currentMap: $currentMap,
        allMaps: getAllMapsQuery.$data,
    },
    fn: ({ currentMap, allMaps }) => {
        if (currentMap && allMaps) {
            return allMaps.filter(
                script => script.id !== currentMap.id,
            );
        } else {
            return allMaps;
        }
    },
    target: selectMapModel.$items,
});

$currentScript.watch(state => console.log(state));

sample({
    //@ts-ignore
    clock: [
        startScriptQuery.finished.success,
        stopScriptQuery.finished.success,
        restartScriptQuery.finished.success,
        pauseScriptQuery.finished.success,
        continueScriptQuery.finished.success,
    ],
    fn: result => result.result,
    target: $currentScript,
});

sample({
    clock: postSelectedScript.finished.success,
    target: getCurrentScript.start,
});

sample({
    clock: startScriptQuery.finished.success,
    source: $currentScript,
    fn: script =>
        ({
            ...script,
            startTime: new Date(new Date().getTime()),
        }) as Script,
    target: $currentScript,
});

sample({
    clock: selectScriptModel.itemSelected,
    fn: selectScript => selectScript.id,
    target: postSelectedScript.start,
});

sample({
    clock: selectScriptModel.gate.open,
    source: $currentScript,
    filter: currentScript => Boolean(currentScript),
    target: selectScriptModel.$selectedItem,
});

sample({
    clock: selectMapModel.gate.open,
    source: $currentMap,
    filter: currentScript => Boolean(currentScript),
    target: selectMapModel.$selectedItem,
});

function convertTargetsToNodes(targets: Target[] | null): Node[] {
    if (!targets) return [];

    return targets?.map(target => {
        return {
            id: String(target.id),
            position: {
                x: target.posX,
                y: target.posY,
            },
            data: {
                type: target.type,
                name: target.name,
                //@ts-ignore
                color: target.color,
                state: target.state,
                pos: target.position,
            },
            type: 'target',
        };
    });
}

// function convertTargetsToGroups(
//     targets: Target[] | null,
// ): TargetGroup[] {
//     if (!targets) return [];
//
//     //@ts-ignore
//     const groups = Object.groupBy(
//         targets,
//         ({ groupId }: Target) => groupId,
//     );
//
//     //@ts-ignore
//     return groups.map(group => {
//         return {
//             name: group[0].groupId,
//             targets: group.targets,
//         };
//     });
// }

function convertReliefToNodes(map: Map | null): Node<ReliefData>[] {
    if (!map) {
        return [];
    }

    return map?.relief.map(reliefItem => {
        return {
            id: String(reliefItem.id),
            type: 'relief',
            position: {
                x: reliefItem.posX,
                y: reliefItem.posY,
            },
            data: { ...reliefItem },
            width: reliefItem.width,
            height: reliefItem.height,
        } as Node<ReliefData>;
    });
}

function collectTargetsForMap(
    groups: Group[] | null,
    targets: Target[] | null,
): (Target | { color: string })[] {
    const targetsForMap: (Target | { color: string })[] = [];

    groups?.forEach(group => {
        if (!group) return;
        group.targets.forEach(target =>
            targetsForMap.push({ ...target, color: group.colour }),
        );
    });

    return [...targetsForMap, ...(targets ?? [])];
}
