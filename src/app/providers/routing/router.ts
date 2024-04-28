import {createRouter} from '@tanstack/react-router';
import {rootRoute} from 'app/providers/routing/root.tsx';
import {
    groupsRoute,
    indexRoute,
    mapsRoute,
    resultRoute,
    scriptRoute,
} from 'app/providers/routing/routes.tsx';

export const routeTree = rootRoute.addChildren([
    indexRoute,
    mapsRoute,
    scriptRoute,
    groupsRoute,
    resultRoute,
]);

export const router = createRouter({routeTree});
