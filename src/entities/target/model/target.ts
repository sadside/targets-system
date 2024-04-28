import {createStore, sample} from 'effector';
import {createEffect} from 'effector/effector.umd';
import {XYPosition} from 'reactflow';
import {Group} from 'shared/types/group.ts';

export interface Target {
    id: number;
    position: XYPosition;
    image?: boolean;
    type: string;
    name: string;
    readonly group: Readonly<Group> | null;
}

const targetsMock: Target[] = [
    {
        id: 1,
        position: {x: 0, y: 0},
        type: '24',
        name: 'Дуб2',
        group: null,
    },
    {
        id: 2,
        type: '24',
        name: 'Т-34',
        position: {x: 550, y: 700},
        group: {
            name: 'Танки',
            id: 1,
        },
    },
    {
        id: 3,
        type: '24',
        name: 'Т-224',
        position: {x: 250, y: 400},
        group: {
            name: 'Танки',
            id: 1,
        },
    },
    {
        id: 4,
        type: '24',
        name: 'Т-44',
        position: {x: 350, y: 100},
        group: null,
    },
    {
        id: 5,
        type: '24',
        name: 'БОИНГ',
        position: {x: 550, y: 700},
        group: {
            name: 'Самолеты',
            id: 2,
        },
    },
    {
        id: 6,
        type: '24',
        name: 'СУ-32',
        position: {x: 444, y: 333},
        group: {
            name: 'Самолеты',
            id: 2,
        },
    },
    {
        id: 7,
        type: '24',
        name: 'Крейсер',
        position: {x: 600, y: 100},
        group: {
            name: 'Корабли',
            id: 3,
        },
    },
    {
        id: 8,
        type: '24',
        name: 'Уазик)',
        position: {x: 700, y: 700},
        group: {
            name: 'Транспортеры',
            id: 5,
        },
    },
    {
        id: 9,
        type: '24',
        name: 'Беспилотник',
        position: {x: 500, y: 500},
        group: {
            name: 'Дроны',
            id: 4,
        },
    },
    {
        id: 2,
        type: '24',
        name: 'Бейби уазик)',
        position: {x: 800, y: 700},
        group: {
            name: 'Транспортеры',
            id: 5,
        },
    },
];

export const getAllTargetsFx = createEffect(async () => {
    return targetsMock;
});

export const $targets = createStore<Target[] | null>(targetsMock);

sample({
    clock: getAllTargetsFx.doneData,
    target: $targets,
});
