import {memo} from 'react';
import {NodeResizer} from 'reactflow';
import {TargetData} from 'entities/target/model/target.ts';

interface Props {
    data: TargetData;
    selected: boolean | undefined;
}

export const ResizableNode = memo(({data, selected}: Props) => {
    return (
        <>
            <NodeResizer
                color="#ff0071"
                isVisible={selected}
                minWidth={100}
                minHeight={30}
            />
            <div
                style={{padding: 10}}
                className="w-full h-full bg-green flex items-center justify-center">
                {data.name}
            </div>
        </>
    );
});
