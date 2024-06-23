import { createFactory, invoke } from '@withease/factories';
import {
    EventCallable,
    StoreWritable,
    createEvent,
    createStore,
    sample,
} from 'effector';
import { Gate, createGate } from 'effector-react';

export const createSelect = createFactory(
    <T, Key extends keyof T>({
        renderField,
        items,
    }: {
        renderField: Key;
        items?: T[] | null;
    }) => {
        const res = renderField;
        const itemSelected = createEvent<T>();
        const visibleChanged = createEvent<boolean>();
        const reset = createEvent();

        const $items = createStore<T[] | null>(items ?? null);
        const $selectedItem = createStore<T | null>(null).reset(
            reset,
        );
        const $selectIsVisible =
            createStore<boolean>(false).reset(reset);
        const gate = createGate();
        const $loading = createStore<boolean>(false);

        sample({
            clock: itemSelected,
            target: $selectedItem,
        });

        sample({
            clock: $items,
            filter: items => items?.length === 0,
            fn: () => false,
            target: $selectIsVisible,
        });

        sample({
            clock: visibleChanged,
            source: $items,
            filter: items => items?.length !== 0,
            fn: (_, state) => state,
            target: $selectIsVisible,
        });

        sample({
            clock: itemSelected,
            fn: () => false,
            target: $selectIsVisible,
        });

        return {
            itemSelected,
            $items,
            $selectedItem,
            $selectIsVisible,
            visibleChanged,
            reset,
            res,
            gate,
            $loading,
        };
    },
);

export const testModel = invoke(
    createSelect<{ id: number; value: string }, 'value'>,
    { renderField: 'value' },
);

export type SelectModel<Obj, Key extends keyof Obj> = {
    itemSelected: EventCallable<Obj>;
    $items: StoreWritable<Obj[] | null>;
    $selectedItem: StoreWritable<Obj | null>;
    $selectIsVisible: StoreWritable<boolean>;
    reset: EventCallable<void>;
    visibleChanged: EventCallable<boolean>;
    res: Key;
    gate: Gate<unknown>;
    $loading: StoreWritable<boolean>;
};
