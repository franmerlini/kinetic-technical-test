import { Routes } from '@angular/router';

import {
  categoriesLoadedGuard,
  categoryTreeLoadedGuard,
  productsLoadedGuard,
  selectedProductLoadedGuard,
} from '@products/domain';
import { ProductItem, ProductList } from '@products/feature';

export const routes: Routes = [
  {
    path: '',
    canActivate: [productsLoadedGuard, categoriesLoadedGuard, categoryTreeLoadedGuard],
    component: ProductList,
  },
  {
    path: 'new',
    canActivate: [categoriesLoadedGuard],
    component: ProductItem,
  },
  {
    path: ':id',
    canActivate: [selectedProductLoadedGuard, categoriesLoadedGuard],
    component: ProductItem,
  },
];
