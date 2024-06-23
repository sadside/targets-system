import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
    getAllMapsQuery,
    getAllScriptsQuery,
} from 'pages/index-page/model/index-page-model.ts';

export const scriptPageGate = createGate();

sample({
    clock: scriptPageGate.open,
    source: getAllScriptsQuery.$data,
    filter: scripts => scripts === null,
    target: getAllScriptsQuery.start,
});

sample({
    clock: scriptPageGate.open,
    source: getAllMapsQuery.$data,
    filter: scripts => scripts === null,
    target: getAllMapsQuery.start,
});
