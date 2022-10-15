import type { AsyncRouteProps } from '@lomray/after';
import { asyncComponent } from '@lomray/after';
import React from 'react';
import AppLayout from '@components/layouts/app';
import Loader from '@components/loaders/main-loader';
import ROUTE from '@constants/routes';

const asyncRouteProps = {
  Placeholder: () => <Loader />,
};

/**
 * For add public links:
 * @see TMenuLinks
 */
const routes = [
  {
    // layout
    path: '/',
    element: AppLayout,
    children: [
      // site routes
      {
        path: ROUTE.USERS.URL,
        element: asyncComponent({
          loader: () => import('@pages/users/index.wrapper'),
          ...asyncRouteProps,
        }),
      },
      {
        path: ROUTE.NOT_FOUND.URL,
        element: asyncComponent({
          loader: () => import('@pages/not-found'),
          ...asyncRouteProps,
        }),
      },
    ],
  },
];

export default routes as AsyncRouteProps[];
