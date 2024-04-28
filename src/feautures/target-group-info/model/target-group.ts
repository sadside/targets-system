import {createEvent, createStore, sample} from 'effector';
import {createFactory, invoke} from '@withease/factories';

export const sensorSensitivityValueChanged = createEvent<number>();

export const $sensorSensitivity = createStore(1);

sample({
    clock: sensorSensitivityValueChanged,
    target: $sensorSensitivity,
});

const createCounterInput = createFactory(
    ({initialValue}: {initialValue: number}) => {
        const incremented = createEvent();
        const changed = createEvent<string>();
        const decremented = createEvent();

        const $counter = createStore<number>(initialValue);

        sample({
            clock: changed,
            fn: payload => (+payload >= 0 ? +payload : 0),
            target: $counter,
        });

        sample({
            clock: incremented,
            source: $counter,
            fn: counter => counter + 1,
            target: $counter,
        });

        sample({
            clock: decremented,
            source: $counter,
            filter: state => state - 1 >= 0,
            fn: counter => counter - 1,
            target: $counter,
        });

        return {
            $value: $counter,
            incremented,
            decremented,
            changed,
        };
    }
);

export const shotsToDestroyInput = invoke(createCounterInput, {
    initialValue: 0,
});
export const restartAfterInput = invoke(createCounterInput, {initialValue: 0});
export const timeToDestroyInput = invoke(createCounterInput, {initialValue: 0});

const createCheckboxInput = createFactory(
    ({initialValue}: {initialValue: boolean}) => {
        const changed = createEvent();

        const $value = createStore(initialValue);

        $value.on(changed, prev => !prev);

        return {
            $value,
            changed,
        };
    }
);

export const isHeater = invoke(createCheckboxInput, {initialValue: false});
export const isImitatesFire = invoke(createCheckboxInput, {
    initialValue: false,
});
export const isIndicatesGoals = invoke(createCheckboxInput, {
    initialValue: false,
});
export const isMotionSensor = invoke(createCheckboxInput, {
    initialValue: false,
});
export const useGlonass = invoke(createCheckboxInput, {initialValue: false});
export const followTheScript = invoke(createCheckboxInput, {
    initialValue: false,
});
