import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { Layout } from '@core/feature';

import {
  CategoryEffects,
  CategoryFeature,
  ProductEffects,
  ProductFeature,
  SubcategoryEffects,
  SubcategoryFeature,
} from '@products/data-access';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadChildren: () => import('@home/shell').then((m) => m.routes),
      },
      {
        path: 'products',
        loadChildren: () => import('@products/shell').then((m) => m.routes),
        providers: [
          provideState(ProductFeature),
          provideState(CategoryFeature),
          provideState(SubcategoryFeature),
          provideEffects(ProductEffects, CategoryEffects, SubcategoryEffects),
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
