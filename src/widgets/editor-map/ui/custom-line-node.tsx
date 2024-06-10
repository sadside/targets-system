import {memo} from 'react';
import {NodeResizer} from 'reactflow';
import {TargetData} from 'entities/target/model/target.ts';

interface Props {
    data: TargetData;
    selected: boolean | undefined;
}

export const CustomLineNode = memo(({data, selected}: Props) => {
    const {width, angle} = data;

    return (
        <>
            <NodeResizer
                color="#ff0071"
                isVisible={selected}
                minWidth={1}
                minHeight={1}
                keepAspectRatio
            />
            <div
                style={{
                    width: `${width}px`,
                    height: '2px', // Толщина линии
                    backgroundColor: 'black',
                    transform: `rotate(${angle}deg)`,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                }}
                className="line-node"
            />
        </>
    );
});
