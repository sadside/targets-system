import { createQuery } from '@farfetched/core';
import { invoke } from '@withease/factories';
import { createEvent, sample } from 'effector';
import {
    $currentGroup,
    getGroupByIdQuery,
} from 'pages/groups-page/model/groups-page.ts';
import {
    Group,
    ScriptMock,
} from 'pages/index-page/model/index-page-model.ts';
import { api } from 'shared/api/model/api.ts';
import { createSelect } from 'shared/ui/select/model/select-model.ts';

export const getAllGroupsQuery = createQuery({
    handler: async (): Promise<ScriptMock[]> => {
        // const res = await api.get<ScriptMock[]>('/groups/shorts/');
        //
        // return res.data;

        return [
            {
                id: 1,
                name: '123',
            },
            {
                id: 2,
                name: 'sss',
            },
        ];
    },
});

export const deleteGroupQuery = createQuery({
    handler: async (id: number) => {
        await api.delete(`groups/${id}`);
    },
});

export const saveGroupQuery = createQuery({
    handler: async (group: Group) => {
        console.log(group);
        api.post(`groups/${group.id}`, group);
    },
});

export const groupSaveBtnClicked = createEvent();
export const groupDeleteBtnClicked = createEvent();

export const groupSelectModel = invoke(
    createSelect<ScriptMock, 'name'>,
    {
        renderField: 'name',
    },
);

sample({
    clock: groupSelectModel.gate.open,
    target: getAllGroupsQuery.start,
});

sample({
    clock: getAllGroupsQuery.finished.success.map(
        response => response.result,
    ),
    target: groupSelectModel.$items,
});

sample({
    clock: getAllGroupsQuery.$pending,
    target: groupSelectModel.$loading,
});

sample({
    clock: groupDeleteBtnClicked,
    source: $currentGroup.map(group => group?.id),
    filter: (id): id is number => Boolean(id),
    target: deleteGroupQuery.start,
});

sample({
    clock: deleteGroupQuery.finished.success,
    target: [$currentGroup.reinit, getAllGroupsQuery.start],
});

sample({
    clock: groupSelectModel.itemSelected.map(item => item.id),
    target: getGroupByIdQuery.start,
});
