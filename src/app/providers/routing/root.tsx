import {createRootRoute} from '@tanstack/react-router';
import {Layout} from '../../../widgets/layout/ui/Layout.tsx';

export const rootRoute = createRootRoute({
    component: Layout,
});
