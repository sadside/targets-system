import {
    $selectedRelief,
    Relief,
} from '@/feautures/relief-select/model/relief-select.ts';
import { createEvent, createStore, sample } from 'effector';
import { Target } from 'entities/target/api/target-api.ts';
import { Node, NodeChange, applyNodeChanges } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import {
    MAP_EDIT_MODE,
    allTargetsSelect,
    mapModeSelected,
    reliefAddBtnClicked,
    targetAddBtnClicked,
} from 'widgets/map-actions/model/map-actions.ts';

export enum FIGURE_TYPES {
    CIRCLE,
    RECTANGLE,
    TRIANGLE,
}

type ReliefData = {
    id: number;
    name: string;
    figure: FIGURE_TYPES;
    color: string;
};

interface EditorMapContent {
    targets: Target[];
    relief: any[];
}

export const onNodesChange = createEvent<NodeChange[]>();
export const setNodes = createEvent<Node[]>();
export const nodeAdded = createEvent<Target>();
export const reliefAdded = createEvent<ReliefData>();

export const $activeEditorMap = createStore<EditorMapContent | null>(
    null,
).reset(mapModeSelected);

export const $mapItems = createStore<Node[]>([]);

$mapItems.watch(state => console.log(state));

sample({
    clock: nodeAdded,
    source: $activeEditorMap,
    fn: (mapItems, newTarget) => {
        if (!mapItems) {
            return {
                targets: [newTarget],
                relief: [],
            };
        } else {
            return {
                ...mapItems,
                targets: [...mapItems.targets, newTarget],
            };
        }
    },
    target: $activeEditorMap,
});

sample({
    clock: reliefAdded,
    source: $activeEditorMap,
    fn: (mapItems, newReliefItem) => {
        if (!mapItems) {
            return {
                targets: [],
                relief: [newReliefItem],
            };
        } else {
            return {
                ...mapItems,
                relief: [...mapItems.relief, newReliefItem],
            };
        }
    },
    target: $activeEditorMap,
});

sample({
    source: $activeEditorMap,
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
        targets: [],
        relief: [],
    }),
    target: $activeEditorMap,
});

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
    }),
    target: reliefAdded,
});

function getNodesToRender(data: EditorMapContent | null): Node[] {
    if (!data) return [];

    const targets = data.targets.map(target => {
        return {
            id: String(target.id),
            type: 'target',
            position: {
                x: target.posX,
                y: target.posY,
            },
            data: {
                id: target.id,
                name: target.name,
            },
        } as Node;
    });

    const reliefItems = data.relief.map((relief: ReliefData) => {
        return {
            id: String(uuidv4()),
            type: 'relief',
            position: {
                x: 10,
                y: 10,
            },
            data: relief,
        } as Node<ReliefData>;
    });

    return [...targets, ...reliefItems];
}
