import { Routes } from '@angular/router';

import { Layout } from '@core/feature';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadChildren: () => import('@home/api').then((m) => m.routes),
      },
      {
        path: 'products',
        loadChildren: () => import('@products/api').then((m) => m.routes),
      },
    ],
  },
];
