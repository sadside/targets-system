import { createCounterInput } from '@/feautures/target-group-info/model/target-group.ts';
import { createQuery } from '@farfetched/core';
import { createFactory, invoke } from '@withease/factories';
import { createEvent, createStore, sample } from 'effector';
import {
    Music,
    TARGET_TYPE,
    Target,
} from 'entities/target/api/target-api.ts';
import { ScriptMock } from 'pages/index-page/model/index-page-model.ts';
import { spread } from 'patronum';
import { api } from 'shared/api/model/api.ts';
import { createSelect } from 'shared/ui/select/model/select-model.ts';

export const targetTypesSelect = [
    {
        type: TARGET_TYPE.Little,
    },
    {
        type: TARGET_TYPE.Middle,
    },
    {
        type: TARGET_TYPE.Large,
    },
];

export const sounds = [
    {
        type: Music.None,
    },
    {
        type: Music.Short,
    },
    {
        type: Music.Full,
    },
];

export const getTargetById = createQuery({
    handler: async (id): Promise<Target> => {
        const res = await api.get<Target>(`/targets/${id}`);

        return res.data;
    },
});

export const postTargetQuery = createQuery({
    handler: async (target: Target) => {
        await api.post(`/targets/${target.id}`, target);
    },
});

export const getGroups = createQuery({
    handler: async (): Promise<ScriptMock[]> => [
        {
            id: 1,
            name: 'Группа 1',
        },
        {
            id: 2,
            name: 'Группа 2',
        },
        {
            id: 3,
            name: 'Группа 3',
        },
    ],
});

export const modalVisibleChanged = createEvent<boolean>();
export const targetSaveBtnClicked = createEvent();
export const targetEditClicked = createEvent<number>();
export const modalOpened = createEvent<number>();
export const sensorSensitivityValueChanged = createEvent<number>();

export const $editModalVisible = createStore<boolean>(false);
export const $selectedTargetId = createStore<number | null>(null);

export const $sensorSensitivity = createStore(1);

sample({
    clock: sensorSensitivityValueChanged,
    target: $sensorSensitivity,
});

export const selectTargetTypeModel = invoke(
    createSelect<{ type: TARGET_TYPE }, 'type'>,
    { renderField: 'type', items: targetTypesSelect },
);

export const selectTargetMusicModel = invoke(
    createSelect<{ type: Music }, 'type'>,
    { renderField: 'type', items: sounds },
);

export const selectTargetGroupModel = invoke(
    createSelect<ScriptMock, 'name'>,
    { renderField: 'name' },
);

const createCheckboxInput = createFactory(
    ({ initialValue }: { initialValue: boolean }) => {
        const changed = createEvent();

        const $value = createStore(initialValue);

        $value.on(changed, prev => !prev);

        return {
            $value,
            changed,
        };
    },
);

export const isHeater = invoke(createCheckboxInput, {
    initialValue: false,
});
export const isImitatesFire = invoke(createCheckboxInput, {
    initialValue: false,
});
export const isIndicatesGoals = invoke(createCheckboxInput, {
    initialValue: false,
});
export const isMotionSensor = invoke(createCheckboxInput, {
    initialValue: false,
});
export const useGlonass = invoke(createCheckboxInput, {
    initialValue: false,
});
export const followTheScript = invoke(createCheckboxInput, {
    initialValue: false,
});

export const shotsToDestroyInput = invoke(createCounterInput, {
    initialValue: 0,
});

sample({
    clock: modalVisibleChanged,
    target: $editModalVisible,
});

sample({
    clock: targetEditClicked,
    target: $selectedTargetId,
});

sample({
    clock: modalOpened,
    fn: () => true,
    target: $editModalVisible,
});

sample({
    clock: modalOpened,
    filter: id => Boolean(id),
    target: getTargetById.start,
});

sample({
    clock: getTargetById.finished.success.map(res => ({
        type: res.result.type,
    })),
    target: [selectTargetTypeModel.itemSelected],
});

sample({
    clock: getTargetById.finished.success,
    target: getGroups.start,
});

sample({
    //@ts-ignore
    clock: getGroups.finished.success.map(res => res.result),
    source: getTargetById.$data,
    fn: (target, groups) =>
        groups.find(group => group.id === target?.groupId),
    target: selectTargetGroupModel.$selectedItem,
});

sample({
    clock: getGroups.finished.success.map(res => res.result),
    target: selectTargetGroupModel.$items,
});

sample({
    clock: getTargetById.finished.success.map(res => ({
        type: res.result.music,
    })),
    target: selectTargetMusicModel.$selectedItem,
});

sample({
    clock: getTargetById.finished.success.map(res => res.result),
    target: spread({
        heater: isHeater.$value,
        pointer: isIndicatesGoals.$value,
        fire: isImitatesFire.$value,
        moveSensor: isMotionSensor.$value,
        navi: useGlonass.$value,
        goAfterDestroy: followTheScript.$value,
        valueSensor: $sensorSensitivity,
        shotToDie: shotsToDestroyInput.$value,
    }),
});

sample({
    clock: targetSaveBtnClicked,
    source: {
        target: getTargetById.$data,
        heater: isHeater.$value,
        pointer: isIndicatesGoals.$value,
        fire: isImitatesFire.$value,
        moveSensor: isMotionSensor.$value,
        navi: useGlonass.$value,
        goAfterDestroy: followTheScript.$value,
        valueSensor: $sensorSensitivity,
        shotToDie: shotsToDestroyInput.$value,
        type: selectTargetTypeModel.$selectedItem.map(
            state => state?.type,
        ),
        groupId: selectTargetGroupModel.$selectedItem.map(
            state => state?.id,
        ),
        music: selectTargetMusicModel.$selectedItem.map(
            state => state?.type,
        ),
    },
    fn: ({ target, ...all }) => ({ ...target, ...all }),
    target: postTargetQuery.start,
});

sample({
    clock: postTargetQuery.finished.success,
    fn: () => false,
    target: $editModalVisible,
});
