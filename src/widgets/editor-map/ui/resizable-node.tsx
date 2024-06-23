import { memo } from 'react';
import { NodeResizer } from 'reactflow';
import {
    FIGURE_TYPES,
    ReliefData,
} from 'widgets/editor-map/model/editor-map-model.ts';

interface Props {
    data: ReliefData;
    selected: boolean | undefined;
}

export const ResizableNode = memo(({ data, selected }: Props) => {
    let style = {};
    switch (data.figure) {
        case FIGURE_TYPES.RECTANGLE:
            style = {
                backgroundColor: data.color,
            };
            break;
        case FIGURE_TYPES.TRIANGLE:
            style = {
                borderLeft: '50% solid transparent',
                borderRight: '50% solid transparent',
                borderBottom: `100% solid ${data.color}`,
            };
            break;
        case FIGURE_TYPES.CIRCLE:
            style = {
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: data.color,
            };
            break;
        default:
            break;
    }

    return (
        <>
            <NodeResizer
                color="#ff0071"
                isVisible={selected}
                minWidth={100}
                minHeight={30}
            />
            <div
                style={{
                    ...style,
                    padding: 10,
                }}
                className="w-full h-full flex items-center justify-center text-black">
                {data.name}
            </div>
        </>
    );
});
