import { createQuery } from '@farfetched/core';
import { invoke } from '@withease/factories';
import { sample } from 'effector';
import { Target } from 'entities/target/api/target-api.ts';
import {
    getAllMapsQuery,
    getAllScriptsQuery,
    ScriptMock,
} from 'pages/index-page/model/index-page-model.ts';
import { api } from 'shared/api/model/api.ts';
import { createSelect } from 'shared/ui/select/model/select-model.ts';

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

export const getScriptTargets = createQuery({
    handler: async (id: number): Promise<Target[]> => {
        //TODO поменять юрл
        const res = await api.get<Target[]>(`/targets/${id}`);

        return res.data;

        // return [
        //     {
        //         id: 1,
        //         groupId: '1',
        //         name: 'Статичная мишень',
        //         shotToDie: 1,
        //         navi: true,
        //         posX: 100,
        //         posY: 200,
        //         type: TARGET_TYPE.Middle,
        //         music: Music.None,
        //         fire: true,
        //         pointer: true,
        //         moveSensor: true,
        //         shotSensorType: ShotSensorType.SENSOR1,
        //         valueSensor: 1,
        //         status: TARGET_STATUSES.ONLINE_IDLE,
        //         batteryLevel: 100,
        //         position: 'UP',
        //         state: TARGET_STATES.NO_ACTIVE,
        //         image: '',
        //     },
        //     {
        //         id: 2,
        //         groupId: '1',
        //         name: 'Тестовая мишень',
        //         shotToDie: 2,
        //         navi: false,
        //         posX: 450,
        //         posY: 666,
        //         type: TARGET_TYPE.Little,
        //         music: Music.None,
        //         fire: false,
        //         pointer: false,
        //         moveSensor: false,
        //         shotSensorType: ShotSensorType.SENSOR1,
        //         valueSensor: 2,
        //         status: TARGET_STATUSES.OFFLINE_IN_PROGRESS,
        //         batteryLevel: 50,
        //         position: 'DOWN',
        //         state: TARGET_STATES.ACTIVE,
        //         image: '',
        //     },
        // ];
    },
});

export const selectScriptModel = invoke(
    createSelect<ScriptMock, 'name'>,
    { renderField: 'name' },
);

export const selectMapModel = invoke(
    createSelect<ScriptMock, 'name'>,
    { renderField: 'name' },
);

// logic

sample({
    clock: [
        getAllScriptsQuery.finished.success,
        getAllScriptsQuery.$data,
    ],
    source: getAllScriptsQuery.$data,
    filter: scripts => scripts !== null,
    target: selectScriptModel.$items,
});

sample({
    clock: getAllScriptsQuery.$pending,
    target: selectScriptModel.$loading,
});

sample({
    clock: [getAllMapsQuery.finished.success, getAllMapsQuery.$data],
    source: getAllMapsQuery.$data,
    filter: scripts => scripts !== null,
    target: selectMapModel.$items,
});
