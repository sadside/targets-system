import {createEffect, createEvent, createStore, sample} from 'effector';
import {createGate} from 'effector-react';
import {Group} from 'shared/types/group.ts';

const groupsMock: Group[] = [
    {
        name: 'Танки',
        id: 1,
    },
    {
        name: 'Самолеты',
        id: 2,
    },
    {
        name: 'Корабли',
        id: 3,
    },
    {
        name: 'Дроны',
        id: 4,
    },
    {
        name: 'Транспортеры',
        id: 5,
    },
];

const groupSelected = createEvent<string>();
const getGroupsFx = createEffect(async () => {
    return groupsMock;
});
const $groups = createStore<Group[] | null>(null);
const $selectedGroup = createStore<Group | null>(null);

const groupsGate = createGate();

sample({
    clock: groupsGate.open,
    source: $groups,
    filter: groups => groups == null,
    target: getGroupsFx,
});

sample({
    clock: getGroupsFx.doneData,
    target: $groups,
});

sample({
    clock: groupSelected,
    source: $groups,
    fn: (groups, payload) => {
        let result = null;

        groups &&
            groups?.forEach(group => {
                if (group.name === payload) {
                    result = group;
                }
            });
        return result;
    },
    target: $selectedGroup,
});

export {groupsGate, $groups, getGroupsFx, $selectedGroup, groupSelected};
