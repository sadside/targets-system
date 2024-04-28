import {createStore} from 'effector';
import {Group} from 'shared/types/group.ts';

export const $filterSelectDate = createStore<Date | null>(null);
export const $selectedGroup = createStore<Group | null>(null);
