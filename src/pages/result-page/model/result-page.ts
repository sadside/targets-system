import { createEvent, createStore, sample } from 'effector';

export const modalStateChanged = createEvent<boolean>();

export const $showTargetInfoModal = createStore(false);

sample({
    clock: modalStateChanged,
    target: $showTargetInfoModal,
});
