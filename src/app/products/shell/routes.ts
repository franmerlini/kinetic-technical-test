import { Routes } from '@angular/router';

import { ProductItem, ProductList } from '@products/feature';

export const routes: Routes = [
  {
    path: '',
    component: ProductList,
  },
  {
    path: 'new',
    component: ProductItem,
  },
  {
    path: ':id',
    component: ProductItem,
  },
];
