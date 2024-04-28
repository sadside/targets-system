import {useItem, useTimelineContext} from 'dnd-timeline';
import type {Relevance} from 'dnd-timeline';
import {BaseSyntheticEvent, ReactNode, SyntheticEvent, useState} from 'react';
import {twMerge} from 'tailwind-merge';

interface ItemProps {
    id: string;
    relevance: Relevance;
    children: ReactNode;
}

export const Item = (props: ItemProps) => {
    const {setNodeRef, attributes, listeners, itemStyle, itemContentStyle} =
        useItem({
            id: props.id,
            relevance: props.relevance,
            onResizeStart: () => setIsEditing(true),
            onResizeEnd: () => setIsEditing(false),
        });

    const {getDateFromScreenX} = useTimelineContext();

    const [isEditing, setIsEditing] = useState(false);

    const handleClick = (e: any) => {
        console.log(getDateFromScreenX(e.screenX));
        console.log('q1231');
    };

    return (
        <div ref={setNodeRef} style={itemStyle} {...listeners} {...attributes}>
            <div
                style={itemContentStyle}
                className={twMerge(
                    'flex items-center justify-center bg-green rounded transition hover:border-2 border-[#a5c8ca] border border-red-700',
                    isEditing && 'border-2 border-[#a5c8ca] z-10'
                )}>
                <div
                    style={{
                        width: '100%',
                        overflow: 'hidden',
                    }}
                    className="h-full flex items-center justify-center text-center text-nowrap select-none">
                    {props.children}
                </div>
            </div>
        </div>
    );
};
