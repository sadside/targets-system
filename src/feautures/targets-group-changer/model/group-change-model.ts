import { createStore, sample } from 'effector';
import { Target } from 'entities/target';
import { groupSelected } from 'entities/target-group';
import { getAllTargetsQuery } from 'entities/target/model/target.ts';

const freeTargetsMock: Target[] = [
    {
        id: 1,
        position: { x: 0, y: 0 },
        type: '24',
        name: 'Дуб',
        group: null,
    },
    {
        id: 2,
        type: '24',
        name: 'Т-34',
        position: { x: 550, y: 700 },
        group: null,
    },

    {
        id: 3,
        type: '24',
        name: 'Т-224',
        position: { x: 250, y: 400 },
        group: null,
    },
    {
        id: 4,
        type: '24',
        name: 'Т-44',
        position: { x: 350, y: 100 },
        group: null,
    },
];

// export const getTargetsByGroupFx = createEffect(async (group: Group) => {});

export const $freeTargets = createStore<Target[] | null>(
    freeTargetsMock,
);
export const $selectedGroupTargets = createStore<Target[]>([]);

$selectedGroupTargets.watch(state => console.log(state));

sample({
    clock: groupSelected,
    source: getAllTargetsQuery.$data,
    fn: getTargetsByGroup,
    target: $selectedGroupTargets,
});

sample({
    clock: groupSelected,
    source: getAllTargetsQuery.$data,
    fn: getFreeTargets,
    target: $freeTargets,
});

function getTargetsByGroup(targets: Target[] | null, group: string) {
    const res: Target[] = [];

    targets?.forEach(target => {
        if (target?.group?.name === group) res.push(target);
    });

    return res;
}

function getFreeTargets(targets: Target[] | null) {
    const res: Target[] = [];

    targets?.forEach(target => {
        if (target?.group === null) res.push(target);
    });

    return res;
}
