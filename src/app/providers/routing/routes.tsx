import {createRoute} from '@tanstack/react-router';
import {rootRoute} from 'app/providers/routing/root.tsx';
import {IndexPage} from 'pages/index-page';
import {ScriptPage} from 'pages/script-page';
import {MapsPage} from 'pages/maps-page';
import {GroupsPage} from 'pages/groups-page';
import {ResultPage} from 'pages/result-page';

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: IndexPage,
});

export const scriptRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/script',
    component: ScriptPage,
});

export const mapsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/maps',
    component: MapsPage,
});

export const groupsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/groups',
    component: GroupsPage,
});

export const resultRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/result',
    component: ResultPage,
});
