import { createQuery } from '@farfetched/core';
import { getAllTargets } from 'entities/target/api/target-api.ts';

export const getAllTargetsQuery = createQuery({
    handler: getAllTargets,
});
