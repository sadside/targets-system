import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
    Target,
    TargetData,
} from 'entities/target/api/target-api.ts';
import { getAllTargetsQuery } from 'entities/target/model/target.ts';
import { TargetType } from 'pages/index-page/types.ts';
import { XYPosition } from 'reactflow';

type StaticNode = {
    data: TargetData;
    id: string;
    position: XYPosition;
    type: string;
};

export interface TargetGroup {
    name: string | null;
    targets: TargetType[];
}

export const indexGate = createGate();

sample({
    clock: indexGate.open,
    target: getAllTargetsQuery.refresh,
});

export const $nodesFromTargets = getAllTargetsQuery.$data.map(
    convertTargetsToNodes,
);

$nodesFromTargets.watch(state => console.log(state));

export const $groupsFromTargets = getAllTargetsQuery.$data.map(
    convertTargetsToGroups,
);

$groupsFromTargets.watch(state => console.log(state));

function convertTargetsToNodes(
    targets: Target[] | null,
): StaticNode[] {
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
            },
            type: 'TargetNode',
        };
    });
}

function convertTargetsToGroups(
    targets: Target[] | null,
): TargetGroup[] {
    if (!targets) return [];

    //@ts-ignore
    const groups = Object.groupBy(
        targets,
        ({ groupId }: Target) => groupId,
    );

    //@ts-ignore
    return groups.map(group => {
        return {
            name: group[0].groupId,
            targets: group.targets,
        };
    });
}
