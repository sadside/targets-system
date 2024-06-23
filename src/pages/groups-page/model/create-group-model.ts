import { getAllGroupsQuery } from '@/feautures/target-group-actions/model/target-group-actions.ts';
import { createQuery } from '@farfetched/core';
import { createEvent, createStore, sample } from 'effector';
import { api } from 'shared/api/model/api.ts';

interface GroupData {
    name: string;
    colour: string;
}

export const createGroupQuery = createQuery({
    handler: async (data: GroupData) => {
        console.log(data);
        await api.post('/groups/', data);
    },
});

export const modalVisibleChanged = createEvent<boolean>();
export const inputChanged = createEvent<string>();
export const inputColorChanged = createEvent<string>();
export const formSubmitted = createEvent();

export const $createModalIsVisible = createStore<boolean>(false);
export const $groupName = createStore<string>('');
export const $groupColor = createStore<string>('');

$groupName.on(inputChanged, (_, payload) => payload);
$groupColor.on(inputColorChanged, (_, payload) => payload);

sample({
    clock: modalVisibleChanged,
    target: $createModalIsVisible,
});

sample({
    clock: formSubmitted,
    source: {
        colour: $groupColor,
        name: $groupName,
    },
    target: createGroupQuery.start,
});

sample({
    clock: createGroupQuery.finished.success,
    fn: () => false,
    target: modalVisibleChanged,
});

sample({
    clock: createGroupQuery.finished.success,
    target: getAllGroupsQuery.start,
});
