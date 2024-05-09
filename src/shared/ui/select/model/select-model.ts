import {createFactory, invoke} from '@withease/factories';
import {
    createEvent,
    createStore,
    EventCallable,
    sample,
    StoreWritable,
} from 'effector';
import {createGate, Gate} from 'effector-react';

export const createSelect = createFactory(
    <Obj, Key extends keyof Obj>({
        renderField,
        items,
    }: {
        renderField: Key;
        items?: Obj[] | null;
    }) => {
        const res = renderField;
        const itemSelected = createEvent<Obj>();
        const visibleChanged = createEvent<boolean>();
        const reset = createEvent();

        const $items = createStore<Obj[] | null>(items ?? null);
        const $selectedItem = createStore<Obj | null>(null).reset(reset);
        const $selectIsVisible = createStore<boolean>(false).reset(reset);
        const gate = createGate();

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

        sample({
            clock: gate.close,
            target: reset,
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
        };
    }
);

export const testModel = invoke(
    createSelect<{id: number; value: string}, 'value'>,
    {renderField: 'value'}
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
};
