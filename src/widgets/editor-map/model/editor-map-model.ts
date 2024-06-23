import {
    $selectedRelief,
    Relief,
} from '@/feautures/relief-select/model/relief-select.ts';
import { createEvent, createStore, sample } from 'effector';
import { Target } from 'entities/target/api/target-api.ts';
import { Node, NodeChange, applyNodeChanges } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import { debug } from 'patronum';
import { toast } from 'sonner';
import {
    $mapName,
    MAP_EDIT_MODE,
    allTargetsSelect,
    createMap,
    getMapById,
    mapCreateBtnClicked,
    mapCreated,
    mapModeSelected,
    mapSaved,
    mapSelect,
    postMapQuery,
    reliefAddBtnClicked,
    targetAddBtnClicked,
} from 'widgets/map-actions/model/map-actions.ts';

export enum FIGURE_TYPES {
    CIRCLE,
    RECTANGLE,
    TRIANGLE,
}

export type ReliefData = {
    id: number;
    name: string;
    figure: FIGURE_TYPES;
    color: string;
    posX: number;
    posY: number;
    width?: number;
    height?: number;
};

export interface Map {
    id?: number;
    name?: string;
    relief: ReliefData[];
}

export const onNodesChange = createEvent<NodeChange[]>();
export const setNodes = createEvent<Node[]>();
export const nodeAdded = createEvent<Target>();
export const reliefAdded = createEvent<ReliefData>();

export const $mapItemsFromServer = createStore<Map | null>(
    null,
).reset(mapModeSelected);

export const $mapItems = createStore<Node[]>([]);

sample({
    clock: nodeAdded,
    source: $mapItems,
    fn: (mapItems, newTarget) => {
        const item = {
            id: String(newTarget.id),
            type: 'target',
            position: {
                x: newTarget.posX,
                y: newTarget.posY,
            },
            data: {
                id: newTarget.id,
                name: newTarget.name,
            },
        } as Node;

        return [...mapItems, item];
    },
    target: $mapItems,
});

sample({
    clock: reliefAdded,
    source: $mapItems,
    fn: (mapItems, newReliefItem) => {
        const item = {
            id: String(uuidv4()),
            type: 'relief',
            position: {
                x: newReliefItem?.posX ?? 10,
                y: newReliefItem?.posY ?? 10,
            },
            data: { ...newReliefItem },
            width: newReliefItem.width ?? 100,
            height: newReliefItem.height ?? 50,
        } as Node<ReliefData>;

        return [...mapItems, item];
    },
    target: $mapItems,
});

sample({
    source: $mapItemsFromServer.updates,
    fn: getNodesToRender,
    target: $mapItems,
});

sample({
    clock: onNodesChange,
    source: $mapItems,
    fn: (nodes, changes) => applyNodeChanges(changes, nodes),
    target: $mapItems,
});

sample({
    clock: setNodes,
    target: $mapItems,
});

sample({
    clock: mapModeSelected,
    filter: mode => mode === MAP_EDIT_MODE.CREATE,
    fn: () => ({
        relief: [],
    }),
    target: $mapItemsFromServer,
});

sample({
    clock: mapSelect.itemSelected,
    fn: map => map.id,
    target: getMapById.start,
});

sample({
    clock: getMapById.finished.success.map(data => data.result),
    target: $mapItemsFromServer,
});

debug($mapItems);

// reliefAddBtnClicked

sample({
    clock: targetAddBtnClicked,
    source: allTargetsSelect.$selectedItem,
    filter: (target): target is Target => {
        return target !== null;
    },
    target: nodeAdded,
});

sample({
    clock: reliefAddBtnClicked,
    source: $selectedRelief,
    filter: (relief): relief is Relief => {
        return relief !== null;
    },
    fn: (relief, figure) => ({
        ...(relief as Relief),
        figure,
        posX: 10,
        posY: 10,
    }),
    target: reliefAdded,
});

sample({
    //@ts-ignore
    clock: mapSaved,
    source: {
        currentMap: $mapItemsFromServer,
        mapItems: $mapItems,
    },
    fn: ({ currentMap, mapItems }) => {
        const relief: ReliefData[] = mapItems.map(relief => ({
            ...relief.data,
            width: relief.width,
            height: relief.height,
            posY: relief.position.y,
            posX: relief.position.x,
        }));

        return {
            //@ts-ignore
            id: currentMap.id,
            //@ts-ignore
            name: currentMap.name,
            relief,
        } as Map;
    },
    target: postMapQuery.start,
});

sample({
    //@ts-ignore
    clock: mapCreated,
    source: {
        currentMap: $mapName,
        mapItems: $mapItems,
    },
    fn: ({ currentMap, mapItems }) => {
        const relief: ReliefData[] = mapItems.map(relief => ({
            ...relief.data,
            width: relief.width,
            height: relief.height,
            posY: relief.position.y,
            posX: relief.position.x,
        }));

        return {
            //@ts-ignore
            name: currentMap,
            relief,
        } as Map;
    },
    target: postMapQuery.start,
});

sample({
    clock: postMapQuery.finished.success,
    fn: () => toast.success('Успешно!'),
});

sample({
    clock: mapCreateBtnClicked,
    source: {
        relief: $mapItems,
        name: $mapName,
    },
    fn: ({ relief, name }) => {
        return {
            name,
            relief: relief.map(item => ({
                ...item.data,
                id: item.id,
            })),
        };
    },
    target: createMap.start,
});

function getNodesToRender(data: Map | null): Node[] {
    if (!data) return [];

    return data.relief.map((relief: ReliefData) => {
        return {
            id: String(relief.id),
            type: 'relief',
            position: {
                x: relief?.posX,
                y: relief?.posY,
            },
            data: { ...relief },
            width: relief.width,
            height: relief.height,
        } as Node<ReliefData>;
    });
}
