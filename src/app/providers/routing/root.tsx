import {createRootRoute} from '@tanstack/react-router';
import {Layout} from 'widgets/layout/ui/Layout';

export const rootRoute = createRootRoute({
    component: Layout,
});
