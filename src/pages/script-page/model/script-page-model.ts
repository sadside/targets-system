import { sample } from 'effector';
import { createGate } from 'effector-react';
import { getAllScriptsQuery } from 'widgets/script-actions/model/script-action.ts';

export const scriptPageGate = createGate();

sample({
    clock: scriptPageGate.open,
    target: getAllScriptsQuery.refresh,
});
