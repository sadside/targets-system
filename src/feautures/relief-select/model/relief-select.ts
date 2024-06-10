import { createQuery } from '@farfetched/core';
import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

export interface Relief {
    id: number;
    name: string;
    color: string;
}

export const getAllReliefsQuery = createQuery({
    handler: async (): Promise<Relief[]> => {
        const mock = [
            {
                id: 1,
                name: 'Лесные экосистемы',
                color: '#02AF52',
            },

            {
                id: 2,
                name: 'Нелесеые экосистемы',
                color: '#FEE110',
            },
            {
                id: 3,
                name: 'Территории, не покрытые лесом',
                color: '#FFF',
            },
            {
                id: 4,
                name: 'Территории, не покрытые лесом',
                color: '#FFF',
            },
            {
                id: 5,
                name: 'Озера и крупные реки',
                color: '#5878B9',
            },
            {
                id: 6,
                name: 'Океаны и моря',
                color: '#A7D8E7',
            },
        ];

        return new Promise(resolve =>
            setTimeout(() => resolve(mock), 3000),
        );
    },
});

export const reliefSelected = createEvent<Relief>();
export const visibleChanged = createEvent<boolean>();
export const reset = createEvent();

export const $selectedRelief = createStore<Relief | null>(null).reset(
    reset,
);
export const $selectIsVisible =
    createStore<boolean>(false).reset(reset);

export const reliefGate = createGate();

sample({
    clock: reliefSelected,
    target: $selectedRelief,
});

sample({
    clock: getAllReliefsQuery.$data,
    filter: items => items?.length === 0,
    fn: () => false,
    target: $selectIsVisible,
});

sample({
    clock: visibleChanged,
    source: getAllReliefsQuery.$data,
    filter: items => items?.length !== 0,
    fn: (_, state) => state,
    target: $selectIsVisible,
});

sample({
    clock: reliefSelected,
    fn: () => false,
    target: $selectIsVisible,
});

sample({
    clock: reliefGate.open,
    target: getAllReliefsQuery.refresh,
});

sample({
    clock: reliefGate.close,
    target: reset,
});
