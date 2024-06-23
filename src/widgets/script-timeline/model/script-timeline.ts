import { createQuery } from '@farfetched/core';
import { secondsToMilliseconds } from 'date-fns';
import { millisecondsInMinute } from 'date-fns/constants';
import {
    ItemDefinition,
    RowDefinition,
    Timeframe,
} from 'dnd-timeline';
import { createEvent, createStore, sample } from 'effector';
import { debug, spread } from 'patronum';
import { api } from 'shared/api/model/api.ts';
import { selectScriptModel } from 'widgets/script-actions/model/script-action.ts';

export const DEFAULT_TIMEFRAME: Timeframe = {
    start: new Date('1977-01-01T01:00:00.000+00:00'),
    end: new Date(
        new Date('1977-01-01T01:00:00.000+00:00').getTime() +
            millisecondsInMinute * 2 -
            1,
    ),
};

export interface Event {
    id: number;
    targetId: number;
    groupId: number;
    timeStart?: string;
    timeEnd?: string;
    individual: boolean;
}

export const getScriptEventsQuery = createQuery({
    handler: async (id: number): Promise<Event[]> => {
        const res = await api.get<Event[]>('/traininglines' + id);

        return res.data;
        // return [
        //     {
        //         id: 1,
        //         targetId: 101,
        //         groupId: 0,
        //         timeStart: '1977-01-01T01:00:00.000+00:00',
        //         timeEnd: '1977-01-01T01:00:20.000+00:00',
        //         individual: true,
        //     },
        //     {
        //         id: 2,
        //         targetId: 0,
        //         groupId: 202,
        //         timeStart: '1977-01-01T01:00:10.000+00:00',
        //         timeEnd: '1977-01-01T01:00:45.000+00:00',
        //         individual: false,
        //     },
        //     {
        //         id: 3,
        //         targetId: 103,
        //         groupId: 0,
        //         timeStart: '1977-01-01T01:01:20.000+00:00',
        //         timeEnd: '1977-01-01T01:01:40.000+00:00',
        //         individual: true,
        //     },
        //     {
        //         id: 5,
        //         targetId: 103,
        //         groupId: 0,
        //         timeStart: '1977-01-01T01:00:10.000+00:00',
        //         timeEnd: '1977-01-01T01:00:20.000+00:00',
        //         individual: true,
        //     },
        //     {
        //         id: 4,
        //         targetId: 0,
        //         groupId: 204,
        //         timeStart: '1977-01-01T01:00:10.000+00:00',
        //         timeEnd: '1977-01-01T01:00:20.000+00:00',
        //         individual: false,
        //     },
        // ];
    },
});

export const activeIntervalChanged = createEvent<number>();
export const timeframeChanged = createEvent<Timeframe>();
export const rowRemoved = createEvent<string>();
export const timelineEventsChanged = createEvent<ItemDefinition[]>();
export const rowAdded = createEvent<{ id: number }>();

export const $activeInterval = createStore(secondsToMilliseconds(1));
export const $timeframe = createStore<Timeframe>(DEFAULT_TIMEFRAME);
// export const $events = createStore<Event[] | null>(null);
export const $timelineEvents = createStore<ItemDefinition[]>([]);
export const $timelineRows = createStore<RowDefinition[]>([]);

debug($timelineEvents, $timelineRows);

sample({
    clock: activeIntervalChanged,
    target: $activeInterval,
});

sample({
    clock: timeframeChanged,
    target: $timeframe,
});

sample({
    //@ts-ignore
    clock: selectScriptModel.itemSelected,
    target: getScriptEventsQuery.start,
});

sample({
    clock: getScriptEventsQuery.finished.success,
    source: getScriptEventsQuery.$data,
    fn: mapEventsToTimeline,
    target: spread({
        rows: $timelineRows,
        items: $timelineEvents,
    }),
});

sample({
    clock: timelineEventsChanged,
    target: $timelineEvents,
});

sample({
    clock: rowRemoved,
    source: $timelineRows,
    fn: (rows, removedRowId) =>
        rows.filter(row => row.id !== removedRowId) ?? rows,
    target: $timelineRows,
});

sample({
    clock: rowRemoved,
    source: $timelineEvents,
    fn: (rows, removedRowId) =>
        rows.filter(row => row.rowId !== removedRowId) ?? rows,
    target: $timelineEvents,
});

sample({
    clock: rowAdded,
    source: $timelineRows,
    fn: (rows, { id }) => {
        return [
            ...rows,
            {
                id: id.toString(),
                disabled: true,
            },
        ];
    },
    target: $timelineRows,
});

function mapEventsToTimeline(events: Event[] | null): {
    rows: RowDefinition[];
    items: ItemDefinition[];
} {
    if (!events) {
        return { rows: [], items: [] };
    }

    const rows: { [key: string]: RowDefinition } = {};
    const items: ItemDefinition[] = [];

    events.forEach(event => {
        // const rowId =
        //     event.groupId === 0
        //         ? `${event.targetId}`
        //         : `${event.groupId}`;

        const rowId = `${event.targetId}-${event.groupId}`;

        if (!rows[rowId]) {
            rows[rowId] = { id: rowId, disabled: true };
        }

        if (event.timeStart && event.timeEnd) {
            items.push({
                id: event.id.toString(),
                rowId,
                disabled: true,
                relevance: {
                    start: new Date(event.timeStart),
                    end: new Date(event.timeEnd),
                },
            });
        }
    });

    return { rows: Object.values(rows), items };
}
