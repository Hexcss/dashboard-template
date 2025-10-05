import { routeIds, type LazyRouteModule } from './types';
import { requireAuthLoader, requireAnonLoader } from './guards';
import type { RouteObject } from 'react-router-dom';

const RootLayout = () =>
  import('../pages/RootLayout').then((m) => ({ Component: m.default })) as Promise<LazyRouteModule>;

export const routes: RouteObject[] = [
  {
    id: 'root',
    path: '/',
    lazy: RootLayout, 
    children: [
      {
        id: routeIds.home,
        index: true,
        lazy: () => import('../pages/Home').then(m => ({ Component: m.default })),
      },
      {
        id: routeIds.login,
        path: 'login',
        loader: requireAnonLoader,
        lazy: () => import('../pages/Login').then(m => ({ Component: m.default })),
      },
      {
        id: routeIds.dashboard,
        path: 'dashboard',
        loader: requireAuthLoader,
        lazy: () => import('../pages/Dashboard').then(m => ({ Component: m.default })),
      },
    ],
  },
];
