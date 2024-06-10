import { createQuery } from '@farfetched/core';
import { createEvent, createStore, sample } from 'effector';
import { Target } from 'entities/target/api/target-api.ts';
import { api } from 'shared/api/model/api.ts';
import { Script } from 'shared/types/script.ts';

export const getAllScriptsQuery = createQuery({
    handler: async () => {
        // const res = await api.get('');

        // return res.data;
        const res = [
            {
                id: 1,
                name: 'Утро в лесу',
            },
            {
                id: 2,
                name: 'Ночь на реке',
            },
            {
                id: 3,
                name: 'Дом',
            },
        ];

        return new Promise(resolve =>
            setTimeout(() => {
                resolve(res);
            }, 2000),
        ).then(data => data as Target[]);
    },
});

export const getScriptByIdQuery = createQuery({
    handler: async (id: number) => {
        const res = await api.get('' + id);

        return res.data;
    },
});

export const deleteScriptByIdQuery = createQuery({
    handler: async (id: number) => {
        const res = await api.get('' + id);

        return res.data;
    },
});

export const saveScriptQuery = createQuery({
    handler: async (id: number) => {
        const res = await api.get('' + id);

        return res.data;
    },
});

export const createScriptQuery = createQuery({
    handler: async (id: number) => {
        const res = await api.get('' + id);

        return res.data;
    },
});

export const scriptSelected = createEvent<string>();

export const $selectedScript = createStore<Script | null>(null);

sample({
    clock: scriptSelected,
    fn: value => JSON.parse(value) as Script,
    target: $selectedScript,
});

sample({
    clock: $selectedScript,
    filter: script => Boolean(script),
    //@ts-ignore
    fn: (script: Script) => script.id,
    target: getScriptByIdQuery.refresh,
});
