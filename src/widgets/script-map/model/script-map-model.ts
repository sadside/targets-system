import { createQuery } from '@farfetched/core';
import { createEvent, createStore, sample } from 'effector';
import { Target } from 'entities/target/api/target-api.ts';
import { Map } from 'pages/index-page/model/index-page-model.ts';
import { debug } from 'patronum';
import { Node, NodeChange, applyNodeChanges } from 'reactflow';
import { api } from 'shared/api/model/api.ts';
import { ReliefData } from 'widgets/editor-map/model/editor-map-model.ts';
import {
    getScriptTargets,
    selectMapModel,
    selectScriptModel,
} from 'widgets/script-actions/model/script-action.ts';

export const onNodesChange = createEvent<NodeChange[]>();
export const setNodes = createEvent<Node[]>();

export const $targets = createStore<Node[]>([]);

export const getMapById = createQuery({
    handler: async (id: number): Promise<Map> => {
        const { data } = await api.get<Map>(`/map/${id}`);

        return data;
    },
});

export const $reliefItems = getMapById.$data.map(
    convertReliefToNodes,
);

sample({
    clock: selectScriptModel.itemSelected,
    fn: scriptFromSelect => scriptFromSelect.id,
    target: getScriptTargets.start,
});

sample({
    clock: selectMapModel.itemSelected,
    fn: selectedMap => selectedMap.id,
    target: getMapById.start,
});

sample({
    clock: getScriptTargets.finished.success,
    fn: data => getNodesToRender(data.result),
    target: $targets,
});

sample({
    clock: onNodesChange,
    source: $targets,
    fn: (nodes, changes) => applyNodeChanges(changes, nodes),
    target: $targets,
});

sample({
    clock: setNodes,
    target: $targets,
});

debug($targets, $reliefItems);

function getNodesToRender(data: Target[]): Node[] {
    if (!data) return [];

    const targets = data.map(target => {
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
        };
    });

    return [...targets];
}

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
            resizing: false,
            draggable: false,
        } as Node<ReliefData>;
    });
}
