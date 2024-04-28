import {XYPosition} from 'reactflow';
import {Target} from 'entities/target';

type Node = {data: Target; id: string; position: XYPosition; type: string};

export const getNodesToRender = (targets: Target[]): Node[] => {
    const result: Node[] = targets?.map(target => {
        return {
            id: String(target.id),
            position: target.position,
            data: target,
            type: 'customTargetNode',
        };
    });

    return result;
};
