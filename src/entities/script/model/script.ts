import {createStore} from 'effector';
import {Script} from 'shared/types/script.ts';

// export interface Script {
//     id: number;
//     name: string;
//     timelines: Timeline[];
// }

const mock: Script[] = [
    {
        id: 1,
        name: 'Горные мишени',
    },
    {
        id: 2,
        name: 'Стоячие мишени',
    },
    {
        id: 3,
        name: 'Повышенная сложность',
    },
];

export const $scripts = createStore<Script[] | null>(mock);
