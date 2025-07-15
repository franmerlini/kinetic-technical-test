import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { filter, take, tap } from 'rxjs';

import { ProductActions, ProductFeature } from '@products/data-access';

export const productsLoadedGuard: CanActivateFn = () => {
  const store = inject(Store);
  return store.select(ProductFeature.selectLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(ProductActions.loadProducts());
      }
    }),
    filter((loaded) => loaded),
    take(1)
  );
};
