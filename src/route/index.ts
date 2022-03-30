import { lazy } from 'react';

export type RouteConfigType = {
  path: string;
  name: string;
};

export const routeConfig = [
  {
    path: '/nav-bar',
    name: 'dev导航',
    component: lazy(() => import('../views/nav-bar')),
  },
  {
    path: '/feedback',
    name: '意见管理',
    component: lazy(() => import('../views/feedback/list')),
  },
  {
    path: '/feedback/:id',
    name: '意见反馈',
    component: lazy(() => import('../views/feedback/item')),
  },
];
