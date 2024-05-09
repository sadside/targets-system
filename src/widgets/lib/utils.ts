import {secondsToMilliseconds} from 'date-fns';
import {
    millisecondsInDay,
    millisecondsInHour,
    millisecondsInMinute,
    millisecondsInSecond,
} from 'date-fns/constants';
import type {
    ItemDefinition,
    Relevance,
    RowDefinition,
    Timeframe,
} from 'dnd-timeline';
import {nanoid} from 'nanoid';
import {activeIntervalChanged} from 'widgets/script-timeline/model/script-timeline.ts';

interface GenerateRowsOptions {
    disabled?: boolean;
}

export const generateRows = (count: number, options?: GenerateRowsOptions) => {
    return Array(count)
        .fill(0)
        .map((): RowDefinition => {
            const disabled = options?.disabled;

            let id = `row-${nanoid(4)}`;
            if (disabled) id += ' (disabled)';

            return {
                id,
                disabled,
            };
        });
};

// const getRandomInRange = (min: number, max: number) => {
//     return Math.random() * (max - min) + min;
// };

const DEFAULT_MIN_DURATION = secondsToMilliseconds(10);
const DEFAULT_MAX_DURATION = secondsToMilliseconds(15);

export const generateRandomRelevance = (
    timeframe: Timeframe,
    minDuration: number = DEFAULT_MIN_DURATION,
    maxDuration: number = DEFAULT_MAX_DURATION
): Relevance => {
    const duration = Math.random() * 10 < 5 ? minDuration : maxDuration;

    // const start = getRandomInRange(
    //     timeframe.start.getTime(),
    //     timeframe.end.getTime() - duration
    // );

    const start = timeframe.start.getTime() + secondsToMilliseconds(15);

    const end = start + duration;

    return {
        start: new Date(start),
        end: new Date(end),
    };
};

interface GenerateItemsOptions {
    disabled?: boolean;
    background?: boolean;
    minDuration?: number;
    maxDuration?: number;
}

export const generateItems = (
    count: number,
    timeframe: Timeframe,
    rows: RowDefinition[],
    options?: GenerateItemsOptions
) => {
    return Array(count)
        .fill(0)
        .map((): ItemDefinition => {
            const row = rows[Math.ceil(Math.random() * rows.length - 1)];
            const rowId = row.id;
            const disabled = row.disabled || options?.disabled;

            const relevance = generateRandomRelevance(
                timeframe,
                options?.minDuration,
                options?.maxDuration
            );

            let id = `item-${nanoid(4)}`;
            if (disabled) id += ' (disabled)';

            return {
                id,
                rowId,
                relevance,
                disabled,
            };
        });
};

export const generateRulerItems = (timeframe: Timeframe) => {
    const {end, start} = timeframe;
    const items: ItemDefinition[] = [];
    const rowId = 'line';

    const timeframeSize = end.getTime() - start.getTime();

    let duration = millisecondsInMinute;

    if (timeframeSize < millisecondsInMinute * 2) {
        duration = millisecondsInSecond;
        activeIntervalChanged(millisecondsInSecond);
    } else if (timeframeSize < millisecondsInHour * 2) {
        duration = millisecondsInMinute;
        activeIntervalChanged(millisecondsInMinute);
    } else if (timeframeSize < millisecondsInDay * 2) {
        duration = millisecondsInHour;
        activeIntervalChanged(millisecondsInHour);
    } else {
        duration = millisecondsInDay;
        activeIntervalChanged(millisecondsInDay);
    }

    const currentDate = new Date(start.getTime());
    items.push({
        relevance: {
            start: new Date(currentDate.getTime()),
            end: new Date(currentDate.getTime() + duration),
        },
        rowId,
        id: `item-${nanoid(4)} (disabled)`,
        disabled: true,
    });

    while (currentDate.getTime() + duration <= end.getTime()) {
        currentDate.setTime(currentDate.getTime() + duration);
        items.push({
            relevance: {
                start: new Date(currentDate.getTime()),
                end: new Date(currentDate.getTime() + duration),
            },
            rowId,
            id: `item-${nanoid(4)} (disabled)`,
            disabled: true,
        });
    }

    return items;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setPositionBetweenItems = (
    item: Relevance,
    itemStart: number,
    itemEnd: number,
    leftItemEnd: number,
    rightItemStart: number,
    duration: number
): void => {
    if (itemStart < leftItemEnd + secondsToMilliseconds(3)) {
        item.start = new Date(leftItemEnd + secondsToMilliseconds(3));
        // item.end = new Date(itemStart + duration);
    }

    if (itemEnd + secondsToMilliseconds(3) > rightItemStart) {
        item.end = new Date(rightItemStart - secondsToMilliseconds(3));
        // item.start = new Date(itemEnd - duration);
    }

    if (
        itemEnd + secondsToMilliseconds(3) > rightItemStart ||
        itemStart < leftItemEnd + secondsToMilliseconds(3)
    )
        return setPositionBetweenItems(
            item,
            itemStart,
            itemEnd,
            leftItemEnd,
            rightItemStart,
            duration
        );
};

export const getFinalyRevelance = (
    items: ItemDefinition[],
    item: Relevance,
    activeItemId: unknown,
    duration: number
): boolean => {
    let flag = false;

    const itemStart = item.start;
    const itemEnd = item.end;

    items.forEach(itm => {
        if (
            item.start <= itm.relevance.end &&
            itm.relevance.start <= item.end &&
            itm.id !== activeItemId
        ) {
            flag = true;

            // item.start = new Date(
            //     itm.relevance.end.getTime() + secondsToMilliseconds(3)
            // );
            //
            // item.end = new Date(
            //     itm.relevance.end.getTime() +
            //         secondsToMilliseconds(3) +
            //         duration
            // );
            //
            // return getFinalyRevelance(
            //     items,
            //     item,
            //     activeItemId,
            //     activeRowId,
            //     duration
            // );
        }
    });

    if (!flag) {
        items.forEach((element, index) => {
            // const leftItemStart = items[index - 1]?.relevance?.start;
            const leftItemEnd = items[index - 1]?.relevance?.end;
            const rightItemStart = items[index + 1]?.relevance?.start;
            // const rightItemEnd = items[index + 1]?.relevance?.end;

            if (element.id === activeItemId) {
                if (
                    itemEnd.getTime() + secondsToMilliseconds(3) >
                        rightItemStart?.getTime() &&
                    itemStart.getTime() <
                        leftItemEnd?.getTime() + secondsToMilliseconds(3)
                ) {
                    item.end = new Date(
                        rightItemStart?.getTime() - secondsToMilliseconds(3)
                    );
                    item.start = new Date(
                        leftItemEnd?.getTime() + secondsToMilliseconds(3)
                    );
                } else {
                    if (
                        itemStart.getTime() <
                        leftItemEnd?.getTime() + secondsToMilliseconds(3)
                    ) {
                        item.start = new Date(
                            leftItemEnd?.getTime() + secondsToMilliseconds(3)
                        );

                        if (
                            itemStart.getTime() +
                                duration +
                                secondsToMilliseconds(3) <=
                                rightItemStart?.getTime() ||
                            !items[index + 1]
                        ) {
                            item.end = new Date(
                                item.start.getTime() + duration
                            );
                        }
                    }

                    if (
                        itemEnd.getTime() + secondsToMilliseconds(3) >
                        rightItemStart?.getTime()
                    ) {
                        item.end = new Date(
                            rightItemStart?.getTime() - secondsToMilliseconds(3)
                        );

                        if (
                            itemEnd.getTime() -
                                duration -
                                secondsToMilliseconds(3) >=
                                leftItemEnd?.getTime() ||
                            !items[index - 1]
                        ) {
                            item.start = new Date(
                                item.end.getTime() - duration
                            );
                        }
                    }
                }
            }
        });
    }

    return flag;
};
