import {millisecondsToSeconds, secondsToMilliseconds} from 'date-fns';
import {
    DragEndEvent,
    ItemDefinition,
    ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';
import {useCallback, useEffect, useState} from 'react';
import {
    generateItems,
    generateRows,
    generateRulerItems,
    getFinalyRevelance,
} from 'widgets/lib/utils.ts';
import {
    $activeInterval,
    DEFAULT_TIMEFRAME,
    timeframeChanged,
} from 'widgets/script-timeline/model/script-timeline.ts';
import {Timeline} from 'widgets/script-timeline/timeline/ui/timeline.tsx';
import {millisecondsInMinute, millisecondsInSecond} from 'date-fns/constants';
import {useUnit} from 'effector-react';
import {AdditionTargetsModal} from '@/feautures/addition-targets-modal/ui/addition-targets-modal.tsx';
import {targetsMock} from 'widgets/script-map/ui/script-map.tsx';

export const ScriptTimeline = () => {
    const [timeframe, setTimeframe] = useState(DEFAULT_TIMEFRAME);

    const start = DEFAULT_TIMEFRAME.start;

    const [rows] = useState(generateRows(5));
    const [items, setItems] = useState(generateItems(10, timeframe, rows));

    const [rulerItems, setRulerItems] = useState(generateRulerItems(timeframe));
    const activeInterval = useUnit($activeInterval);

    useEffect(() => {
        setRulerItems([]);
        setRulerItems(
            generateRulerItems({
                start: timeframe.start < start ? start : timeframe.start,
                end: timeframe.end,
            })
        );

        timeframeChanged(timeframe);
    }, [timeframe]);

    const onResizeEnd = useCallback(
        (event: ResizeEndEvent, items: ItemDefinition[]) => {
            const updatedRelevance =
                event.active.data.current.getRelevanceFromResizeEvent(event);

            if (!updatedRelevance) return;

            const activeItemId = event.active.id;

            const activeRow = items.find(
                element => element.id === activeItemId
            );

            let activeRowId = null;

            if (activeRow) activeRowId = activeRow.rowId;

            // const end = updatedRelevance.end.getTime();
            // const start = updatedRelevance.start.getTime();
            //
            // const duration = end - start;

            updatedRelevance.start = new Date(
                DEFAULT_TIMEFRAME.start.getTime() +
                    Math.round(
                        (updatedRelevance.start.getTime() -
                            DEFAULT_TIMEFRAME.start.getTime()) /
                            activeInterval
                    ) *
                        activeInterval
            );

            updatedRelevance.end = new Date(
                DEFAULT_TIMEFRAME.start.getTime() +
                    Math.round(
                        (updatedRelevance.end.getTime() -
                            DEFAULT_TIMEFRAME.start.getTime()) /
                            activeInterval
                    ) *
                        activeInterval
            );

            const mock: ItemDefinition[] = items.map(item => {
                if (item.id !== activeItemId) return item;

                return {
                    ...item,
                    rowId: activeRowId,
                    relevance: updatedRelevance,
                };
            });

            const rowItems = Object.groupBy(mock, ({rowId}) => rowId)[
                activeRowId
            ].sort((a, b) => a.relevance.start - b.relevance.start);

            rowItems.forEach((element, index) => {
                if (element.id === activeItemId) {
                    if (
                        element.relevance.start.getTime() -
                            secondsToMilliseconds(3) <=
                            rowItems[index - 1]?.relevance.end.getTime() &&
                        rowItems[index - 1]
                    ) {
                        updatedRelevance.start = new Date(
                            rowItems[index - 1].relevance.end.getTime() +
                                secondsToMilliseconds(3)
                        );
                    }

                    if (
                        element.relevance.end.getTime() +
                            secondsToMilliseconds(3) >=
                            rowItems[index + 1]?.relevance.start.getTime() &&
                        rowItems[index + 1]
                    ) {
                        updatedRelevance.end = new Date(
                            rowItems[index + 1].relevance.start.getTime() -
                                secondsToMilliseconds(3)
                        );
                    }
                }
            });

            setItems(prev =>
                prev.map(item => {
                    if (item.id !== activeItemId) return item;

                    return {
                        ...item,
                        relevance: updatedRelevance,
                    };
                })
            );
        },
        [setItems]
    );

    const onDragEnd = useCallback(
        (event: DragEndEvent, items: ItemDefinition[], activeInterval) => {
            const activeItemId = event.active.id;
            const activeRowId = event.over?.id as string;

            const updatedRelevance =
                event.active.data.current.getRelevanceFromDragEvent(event);

            if (!updatedRelevance || !activeRowId) return;

            const end = updatedRelevance.end.getTime();
            const start = updatedRelevance.start.getTime();

            const duration = end - start;

            updatedRelevance.start = new Date(
                DEFAULT_TIMEFRAME.start.getTime() +
                    Math.round(
                        (updatedRelevance.start.getTime() -
                            DEFAULT_TIMEFRAME.start.getTime()) /
                            activeInterval
                    ) *
                        activeInterval
            );

            updatedRelevance.end = new Date(
                updatedRelevance.start.getTime() + duration
            );

            const mock = items.map(item => {
                if (item.id !== activeItemId) return item;

                return {
                    ...item,
                    rowId: activeRowId,
                    relevance: updatedRelevance,
                };
            });

            const rowItems = Object.groupBy(mock, ({rowId}) => rowId)[
                activeRowId
            ].sort((a, b) => a.relevance.start - b.relevance.start);

            if (
                getFinalyRevelance(
                    rowItems,
                    updatedRelevance,
                    activeItemId,
                    duration
                )
            )
                return;

            setItems(prev =>
                prev.map(item => {
                    if (item.id !== activeItemId) return item;

                    return {
                        ...item,
                        rowId: activeRowId,
                        relevance: updatedRelevance,
                    };
                })
            );
        },
        [setItems]
    );

    return (
        <>
            <TimelineContext
                onDragEnd={(e: DragEndEvent) =>
                    onDragEnd(e, items, activeInterval)
                }
                onResizeEnd={(e: ResizeEndEvent) => onResizeEnd(e, items)}
                onTimeframeChanged={setTimeframe}
                timeframe={{
                    start: timeframe.start < start ? start : timeframe.start,
                    end: timeframe.end,
                }}>
                <AdditionTargetsModal targets={targetsMock} />
                <Timeline
                    items={items}
                    rows={rows}
                    setItems={setItems}
                    rulerItems={rulerItems}
                    setTimeframe={setTimeframe}
                />
            </TimelineContext>
        </>
    );
};
