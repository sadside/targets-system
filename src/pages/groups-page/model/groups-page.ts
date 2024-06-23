import {
    $freeTargets,
    getFreeTargetsQuery,
} from '@/feautures/targets-group-changer/model/group-change-model.ts';
import { createQuery } from '@farfetched/core';
import { createEvent, createStore, sample } from 'effector';
import { Target } from 'entities/target/api/target-api.ts';
import { Group } from 'pages/index-page/model/index-page-model.ts';
import { debug, spread } from 'patronum';
import { api } from 'shared/api/model/api.ts';

export const getGroupByIdQuery = createQuery({
    handler: async (id): Promise<Group> => {
        const res = await api.get(`/groups/${id}`);
        // await new Promise(resolve => setTimeout(resolve, 2000));
        //
        // return {
        //     id: 1,
        //     name: 'Mock Group',
        //     colour: '#FF5733',
        //     shotToDie: 3,
        //     navi: true,
        //     posX: 100,
        //     posY: 200,
        //     type: TARGET_TYPE.Middle,
        //     music: Music.Full,
        //     fire: true,
        //     moveSensor: false,
        //     shotSensorType: ShotSensorType.SENSOR1,
        //     valueSensor: 50,
        //     goAfterDestroy: false,
        //     heater: true,
        //     targets: [
        //         {
        //             id: 3,
        //             groupId: 1,
        //             name: '123123',
        //             shotToDie: 1,
        //             navi: true,
        //             posX: 100,
        //             posY: 200,
        //             type: TARGET_TYPE.Large,
        //             music: Music.None,
        //             fire: true,
        //             pointer: true,
        //             moveSensor: true,
        //             shotSensorType: ShotSensorType.SENSOR1,
        //             valueSensor: 1,
        //             status: TARGET_STATUSES.ONLINE_IDLE,
        //             batteryLevel: 100,
        //             position: 'UP',
        //             state: TARGET_STATES.NO_ACTIVE,
        //             image: '',
        //             groupName: '123',
        //             goAfterDestroy: true,
        //             heater: true,
        //         },
        //     ],
        // };
        return res.data;
    },
});

export const targetAdded = createEvent<number>();
export const targetRemoved = createEvent<number>();

export const targetsChanged = createEvent<Target[]>();

export const $currentGroup = createStore<Group | null>(null);

$currentGroup.on(targetsChanged, (group, state) => ({
    ...group,
    targets: state,
}));

sample({
    clock: targetsChanged,
    source: $currentGroup,
    fn: (group, newTargets) => ({
        ...group,
        targets: newTargets,
    }),
    target: $currentGroup,
});

// sample({
//     clock: groupSelectModel.itemSelected.map(item => item.id),
//     target: getGroupByIdQuery.start,
// });

sample({
    clock: getGroupByIdQuery.finished.success.map(res => res.result),
    target: $currentGroup,
});

sample({
    clock: getGroupByIdQuery.finished.success,
    target: getFreeTargetsQuery.start,
});

debug($currentGroup, $freeTargets, targetsChanged);

sample({
    clock: targetAdded,
    source: {
        freeTargets: $freeTargets,
        groupTargets: $currentGroup.map(
            state => state?.targets ?? [],
        ),
    },
    fn: ({ freeTargets, groupTargets }, addedTargetId) => {
        const targetIndex = freeTargets.findIndex(
            target => target.id === addedTargetId,
        );

        // Если элемент найден
        if (targetIndex !== -1) {
            // Извлечь элемент из freeTargets
            const [target] = freeTargets.splice(targetIndex, 1);

            // Добавить элемент в groupTargets
            groupTargets.push(target);
        }

        return {
            freeTargets: [...freeTargets],
            groupTargets: [...groupTargets],
        };
    },
    target: spread({
        freeTargets: $freeTargets,
        groupTargets: targetsChanged,
    }),
});

sample({
    clock: targetRemoved,
    source: {
        freeTargets: $freeTargets,
        groupTargets: $currentGroup.map(
            state => state?.targets ?? [],
        ),
    },
    fn: ({ freeTargets, groupTargets }, removedTargetId) => {
        // Найти элемент в groupTargets по removedTargetId
        const targetIndex = groupTargets.findIndex(
            target => target.id === removedTargetId,
        );

        // Если элемент найден
        if (targetIndex !== -1) {
            // Извлечь элемент из groupTargets
            const [target] = groupTargets.splice(targetIndex, 1);

            // Добавить элемент в freeTargets
            freeTargets.push(target);
        }

        return {
            freeTargets: [...freeTargets],
            groupTargets: [...groupTargets],
        };
    },
    target: spread({
        freeTargets: $freeTargets,
        groupTargets: targetsChanged,
    }),
});
