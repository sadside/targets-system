import {invoke} from '@withease/factories';
import {createSelect} from 'shared/ui/select/model/select-model.ts';

type TargetType = {
    id: number;
    name: string;
    // image: string,
};

type terrainElement = {
    id: number;
    name: string;
};

const targetTypes: TargetType[] = [
    {
        id: 1,
        name: 'Мишень ГОСТ №1',
    },
    {
        id: 2,
        name: 'Мишень ГОСТ №2',
    },
    {
        id: 3,
        name: 'Мишень ГОСТ №3',
    },
    {
        id: 4,
        name: 'Мишень ГОСТ №4',
    },
    {
        id: 5,
        name: 'Мишень ГОСТ №5',
    },
    {
        id: 6,
        name: 'Мишень ГОСТ №6',
    },
    {
        id: 7,
        name: 'Мишень ГОСТ №7',
    },
    {
        id: 8,
        name: 'Мишень ГОСТ №18',
    },
    {
        id: 9,
        name: 'Мишень ГОСТ №9',
    },

    {
        id: 10,
        name: 'Мишень ГОСТ №10',
    },
    {
        id: 11,
        name: 'Мишень ГОСТ №11',
    },
    {
        id: 12,
        name: 'Мишень ГОСТ №12',
    },
    {
        id: 13,
        name: 'Мишень ГОСТ №13',
    },
    {
        id: 14,
        name: 'Мишень ГОСТ №14',
    },
    {
        id: 15,
        name: 'Мишень ГОСТ №15',
    },
    {
        id: 16,
        name: 'Мишень ГОСТ №16',
    },
    {
        id: 17,
        name: 'Мишень ГОСТ №17',
    },
];

const terrainElemenets: terrainElement[] = [
    {
        id: 1,
        name: 'Дерево',
    },
    {
        id: 1,
        name: 'Пригорок',
    },
];

export const targetSelect = invoke(createSelect<TargetType, 'name'>, {
    renderField: 'name',
    items: targetTypes,
});

export const terrainElementSelect = invoke(
    createSelect<terrainElement, 'name'>,
    {
        renderField: 'name',
        items: terrainElemenets,
    }
);
