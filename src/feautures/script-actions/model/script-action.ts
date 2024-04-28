import {createEvent, createStore, sample} from 'effector';
import {Script} from 'shared/types/script.ts';

export const scriptSelected = createEvent<string>();

export const $selectedScript = createStore<Script | null>(null);

sample({
    clock: scriptSelected,
    fn: value => JSON.parse(value) as Script,
    target: $selectedScript,
});

$selectedScript.watch(val => console.log(val));
