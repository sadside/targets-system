import {useItem} from 'dnd-timeline';
import type {Relevance} from 'dnd-timeline';
import {ReactNode, useState} from 'react';
import {twMerge} from 'tailwind-merge';
import {useUnit} from 'effector-react';
import {
    $activeInterval,
    DEFAULT_TIMEFRAME,
} from 'widgets/script-timeline/model/script-timeline.ts';

interface RulerItemProps {
    id: string;
    relevance: Relevance;
    children: ReactNode;
    index: number;
}

export const RulerItem = (props: RulerItemProps) => {
    const {setNodeRef, attributes, listeners, itemStyle, itemContentStyle} =
        useItem({
            id: props.id,
            relevance: props.relevance,
            onResizeStart: () => setIsEditing(true),
            onResizeEnd: () => setIsEditing(false),
        });

    const [_, setIsEditing] = useState(false);
    const interval = useUnit($activeInterval);

    const value =
        (props.relevance.start.getTime() - DEFAULT_TIMEFRAME.start.getTime()) /
        interval;

    return (
        <div
            ref={setNodeRef}
            style={itemStyle}
            {...listeners}
            {...attributes}
            draggable={false}
            className="">
            <div
                style={{...itemContentStyle, overflow: 'visible'}}
                className={twMerge(
                    'flex items-center justify-center transition'
                )}>
                <div
                    style={{
                        width: '100%',
                    }}
                    className={twMerge(
                        'h-[15px] mt-[25px] flex items-end justify-center text-center border-l-2 border-[#a5c8ca] relative',
                        value % 5 === 0 && 'h-[40px] mt-0'
                    )}>
                    {value % 5 === 0 && (
                        <div className="absolute top-0 left-2">
                            {`${props.relevance.start.getHours()}:${props.relevance.start.getMinutes()}:${props.relevance.start.getSeconds()}`}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
