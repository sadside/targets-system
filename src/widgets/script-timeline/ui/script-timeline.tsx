import { AdditionTargetsModal } from '@/feautures/addition-targets-modal/ui/addition-targets-modal.tsx';
import { UniqueIdentifier } from '@dnd-kit/core';
import { secondsToMilliseconds } from 'date-fns';
import {
    DragEndEvent,
    ItemDefinition,
    Relevance,
    ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';
import { useUnit } from 'effector-react';
import { useCallback, useEffect, useState } from 'react';
import {
    generateRulerItems,
    getFinalyRevelance,
} from 'widgets/lib/utils.ts';
import {
    $activeInterval,
    $timelineEvents,
    $timelineRows,
    DEFAULT_TIMEFRAME,
    timeframeChanged,
    timelineEventsChanged,
} from 'widgets/script-timeline/model/script-timeline.ts';
import { Timeline } from 'widgets/script-timeline/timeline/ui/timeline.tsx';
import '../model/script-timeline.ts';

interface Props {
    timeframe: Relevance;
    setTimeframe: React.Dispatch<React.SetStateAction<Relevance>>;
}

export const ScriptTimeline = ({
    timeframe,
    setTimeframe,
}: Props) => {
    const start = DEFAULT_TIMEFRAME.start;

    // const [rows] = useState(generateRows(5));
    // const [items, setItems] = useState(
    //     generateItems(10, timeframe, rows),
    // );

    const [rows, items, activeInterval] = useUnit([
        $timelineRows,
        $timelineEvents,
        $activeInterval,
    ]);

    const setTimelineEvents = useUnit(timelineEventsChanged);

    const [rulerItems, setRulerItems] = useState(
        generateRulerItems(timeframe),
    );

    // const setEvents = (
    //     updateCallback: (
    //         currentEvents: ItemDefinition[],
    //     ) => ItemDefinition[],
    // ) => {
    //     setTimelineEvents(updateCallback(items));
    // };

    useEffect(() => {
        setRulerItems([]);
        setRulerItems(
            generateRulerItems({
                start:
                    timeframe.start < start ? start : timeframe.start,
                end: timeframe.end,
            }),
        );

        timeframeChanged(timeframe);
    }, [timeframe]);

    const onResizeEnd = useCallback(
        (event: ResizeEndEvent, items: ItemDefinition[]) => {
            const updatedRelevance =
                event.active.data.current.getRelevanceFromResizeEvent(
                    event,
                );

            if (!updatedRelevance) return;

            const activeItemId = event.active.id;

            const activeRow = items.find(
                element => element.id === activeItemId,
            );

            let activeRowId: string | null = null;

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
                            activeInterval,
                    ) *
                        activeInterval,
            );

            updatedRelevance.end = new Date(
                DEFAULT_TIMEFRAME.start.getTime() +
                    Math.round(
                        (updatedRelevance.end.getTime() -
                            DEFAULT_TIMEFRAME.start.getTime()) /
                            activeInterval,
                    ) *
                        activeInterval,
            );

            const mock: (
                | ItemDefinition
                | {
                      disabled?: boolean;
                      id: string;
                      relevance: Relevance;
                      rowId: string | null;
                  }
            )[] = items.map(item => {
                if (item.id !== activeItemId) return item;

                return {
                    ...item,
                    rowId: activeRowId,
                    relevance: updatedRelevance,
                };
            });

            //@ts-ignore
            const rowItems = Object.groupBy(
                mock,
                //@ts-ignore
                ({ rowId }) => rowId,
            )[activeRowId].sort(
                (
                    a: { relevance: { start: number } },
                    b: { relevance: { start: number } },
                ) => a.relevance.start - b.relevance.start,
            );

            rowItems.forEach(
                (
                    element: {
                        id: UniqueIdentifier;
                        relevance: {
                            start: { getTime: () => number };
                            end: { getTime: () => number };
                        };
                    },
                    index: number,
                ) => {
                    if (element.id === activeItemId) {
                        if (
                            element.relevance.start.getTime() -
                                secondsToMilliseconds(3) <=
                                rowItems[
                                    index - 1
                                ]?.relevance.end.getTime() &&
                            rowItems[index - 1]
                        ) {
                            updatedRelevance.start = new Date(
                                rowItems[
                                    index - 1
                                ].relevance.end.getTime() +
                                    secondsToMilliseconds(3),
                            );
                        }

                        if (
                            element.relevance.end.getTime() +
                                secondsToMilliseconds(3) >=
                                rowItems[
                                    index + 1
                                ]?.relevance.start.getTime() &&
                            rowItems[index + 1]
                        ) {
                            updatedRelevance.end = new Date(
                                rowItems[
                                    index + 1
                                ].relevance.start.getTime() -
                                    secondsToMilliseconds(3),
                            );
                        }
                    }
                },
            );

            const upd = items.map(item => {
                if (item.id !== activeItemId) return item;

                return {
                    ...item,
                    relevance: updatedRelevance,
                };
            });

            setTimelineEvents(upd);

            // setItems(prev =>
            //     prev.map(item => {
            //         if (item.id !== activeItemId) return item;
            //
            //         return {
            //             ...item,
            //             relevance: updatedRelevance,
            //         };
            //     }),
            // );
        },
        [setTimelineEvents],
    );

    const onDragEnd = useCallback(
        (
            event: DragEndEvent,
            items: ItemDefinition[],
            activeInterval: number,
        ) => {
            const activeItemId = event.active.id;
            const activeRowId = event.over?.id as string;

            const updatedRelevance =
                event.active.data.current.getRelevanceFromDragEvent(
                    event,
                );

            if (
                !updatedRelevance ||
                !activeRowId ||
                updatedRelevance.start < timeframe.start
            )
                return;

            const end = updatedRelevance.end.getTime();
            const start = updatedRelevance.start.getTime();

            const duration = end - start;

            updatedRelevance.start = new Date(
                DEFAULT_TIMEFRAME.start.getTime() +
                    Math.round(
                        (updatedRelevance.start.getTime() -
                            DEFAULT_TIMEFRAME.start.getTime()) /
                            activeInterval,
                    ) *
                        activeInterval,
            );

            updatedRelevance.end = new Date(
                updatedRelevance.start.getTime() + duration,
            );

            const mock = items.map(item => {
                if (item.id !== activeItemId) return item;

                return {
                    ...item,
                    rowId: activeRowId,
                    relevance: updatedRelevance,
                };
            });

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            const rowItems = Object.groupBy(
                mock,
                //@ts-ignore
                ({ rowId }) => rowId,
            )[activeRowId].sort(
                (
                    a: { relevance: { start: number } },
                    b: { relevance: { start: number } },
                ) => a.relevance.start - b.relevance.start,
            );

            if (
                getFinalyRevelance(
                    rowItems,
                    updatedRelevance,
                    activeItemId,
                    duration,
                )
            )
                return;

            // setItems(prev =>
            //     prev.map(item => {
            //         if (item.id !== activeItemId) return item;
            //
            //         return {
            //             ...item,
            //             rowId: activeRowId,
            //             relevance: updatedRelevance,
            //         };
            //     }),
            // );

            const upd = items.map(item => {
                if (item.id !== activeItemId) return item;

                return {
                    ...item,
                    rowId: activeRowId,
                    relevance: updatedRelevance,
                };
            });

            setTimelineEvents(upd);
        },
        [setTimelineEvents],
    );

    return (
        <>
            <TimelineContext
                onDragEnd={(e: DragEndEvent) =>
                    onDragEnd(e, items, activeInterval)
                }
                onResizeEnd={(e: ResizeEndEvent) =>
                    onResizeEnd(e, items)
                }
                onTimeframeChanged={setTimeframe}
                timeframe={{
                    start:
                        timeframe.start < start
                            ? start
                            : timeframe.start,
                    end: timeframe.end,
                }}>
                <AdditionTargetsModal />
                <Timeline
                    items={items}
                    rows={rows}
                    //@ts-ignore
                    setItems={() => {}}
                    rulerItems={rulerItems}
                    setTimeframe={setTimeframe}
                />
            </TimelineContext>
        </>
    );
};
