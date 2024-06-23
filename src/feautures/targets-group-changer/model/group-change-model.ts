import { createQuery } from '@farfetched/core';
import { createStore, sample } from 'effector';
import {
    Music,
    ShotSensorType,
    TARGET_STATES,
    TARGET_TYPE,
    Target,
} from 'entities/target/api/target-api.ts';
import { TARGET_STATUSES } from 'pages/index-page/types.ts';

export const getFreeTargetsQuery = createQuery({
    handler: async (): Promise<Target[]> => {
        // const res = await api.get<Target[]>('/targets/Individual/');
        // return res

        return [
            {
                id: 2,
                groupId: 1,
                name: 'Статичная мишень',
                shotToDie: 1,
                navi: true,
                posX: 100,
                posY: 200,
                type: TARGET_TYPE.Large,
                music: Music.None,
                fire: true,
                pointer: true,
                moveSensor: true,
                shotSensorType: ShotSensorType.SENSOR1,
                valueSensor: 1,
                status: TARGET_STATUSES.ONLINE_IDLE,
                batteryLevel: 100,
                position: 'UP',
                state: TARGET_STATES.NO_ACTIVE,
                image: '',
                groupName: '123',
                goAfterDestroy: true,
                heater: true,
            },
        ];
    },
});

// export const

export const $freeTargets = createStore<Target[]>([]);

sample({
    clock: getFreeTargetsQuery.finished.success.map(
        res => res.result,
    ),
    target: $freeTargets,
});
