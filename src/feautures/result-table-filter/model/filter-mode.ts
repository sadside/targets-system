import {createEvent, sample} from 'effector';
import {$filterSelectDate} from 'entities/result-table';
import {$groups, $selectedGroup} from 'entities/target-group';
import {Group} from 'shared/types/group.ts';

export const groupSelected = createEvent<string>();
export const dateSelected = createEvent<Date | null>();

sample({
    clock: groupSelected,
    source: $groups,
    fn: getGroupById,
    target: $selectedGroup,
});

sample({
    clock: dateSelected,
    target: $filterSelectDate,
});

function getGroupById(groups: Group[] | null, name: string) {
    const foundGroup = groups?.find(group => {
        return group.name === name;
    });

    return foundGroup ? foundGroup : null;
}
