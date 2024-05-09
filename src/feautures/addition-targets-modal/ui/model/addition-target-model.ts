import {createEvent, createStore} from 'effector';

export const modalStateChanged = createEvent<boolean>();
export const $isVisible = createStore(false).on(
    modalStateChanged,
    (_, newState) => newState
);
