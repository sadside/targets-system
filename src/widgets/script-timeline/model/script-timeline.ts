import {createEvent, createStore, sample} from 'effector';
import {Timeframe} from 'dnd-timeline';
import {secondsToMilliseconds, startOfDay} from 'date-fns';
import {millisecondsInMinute} from 'date-fns/constants';

export const DEFAULT_TIMEFRAME: Timeframe = {
    start: startOfDay(new Date()),
    end: new Date(startOfDay(new Date()).getTime() + millisecondsInMinute),
};

export const activeIntervalChanged = createEvent<number>();
export const timeframeChanged = createEvent<Timeframe>();

export const $activeInterval = createStore(secondsToMilliseconds(1));

export const $timeframe = createStore<Timeframe>(DEFAULT_TIMEFRAME);

sample({
    clock: activeIntervalChanged,
    target: $activeInterval,
});

sample({
    clock: timeframeChanged,
    target: $timeframe,
});
