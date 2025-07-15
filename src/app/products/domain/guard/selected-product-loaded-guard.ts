import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { filter, map, take, tap } from 'rxjs';

import { ProductActions, ProductFeature } from '@products/data-access';

export const selectedProductLoadedGuard: CanActivateFn = (route) => {
  const store = inject(Store);
  const productId = Number(route.params['id']);
  return store.select(ProductFeature.selectEntities).pipe(
    map((entities) => entities[productId] !== undefined),
    tap((existsProduct) => {
      if (!existsProduct) {
        store.dispatch(ProductActions.loadSelectedProduct({ productId }));
      }
    }),
    filter((existsProduct) => existsProduct),
    take(1)
  );
};
