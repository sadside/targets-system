import {
    millisecondsToSeconds,
    secondsToMilliseconds,
} from 'date-fns';
import { ItemDefinition, useTimelineContext } from 'dnd-timeline';
import { useUnit } from 'effector-react';
import { nanoid } from 'nanoid';
import React, { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';
import {
    $timelineEvents,
    timelineEventsChanged,
} from 'widgets/script-timeline/model/script-timeline.ts';

interface SubRowProps {
    children: React.ReactNode;
    ruler?: boolean;
    setItems?: Dispatch<SetStateAction<ItemDefinition[]>>;
    id?: string;
    items?: ItemDefinition[];
}

export const SubRow = ({
    children,
    ruler = false,
    id,
    items,
}: SubRowProps) => {
    const { getDateFromScreenX } = useTimelineContext();

    const events = useUnit($timelineEvents);

    const handleClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        const res = [...events];
        let flag = true;

        const itemStartValue = new Date(
            secondsToMilliseconds(
                millisecondsToSeconds(
                    getDateFromScreenX(e.screenX).getTime(),
                ),
            ),
        );

        const relevance = {
            start: itemStartValue,
            end: new Date(
                itemStartValue.getTime() + secondsToMilliseconds(3),
            ),
        };

        items?.forEach(itm => {
            const { start, end } = itm.relevance;

            if (relevance.start <= end && start <= relevance.end) {
                flag = false;
                return;
            }

            if (relevance.start > end) {
                const leftOffset =
                    relevance.start.getTime() - end.getTime();

                if (leftOffset < 3000) {
                    flag = false;
                    return false;
                }
            }

            if (relevance.end < start) {
                const rightOffset =
                    start.getTime() - relevance.end.getTime();

                if (rightOffset < 3000) {
                    flag = false;
                    return false;
                }
            }
        });

        if (flag)
            res.push({
                id: nanoid(4),
                rowId: id || '',
                relevance,
            });

        timelineEventsChanged(res);
    };

    return (
        <div
            className={twMerge(
                'relative h-[60px] border-r border-y border-[#18181b]',
                ruler && 'h-[40px]',
            )}
            onDoubleClick={e => handleClick(e)}>
            {children}
        </div>
    );
};
