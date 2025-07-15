import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { filter, take, tap } from 'rxjs';

import { CategoryActions, CategoryFeature } from '@products/data-access';

export const categoryTreeLoadedGuard: CanActivateFn = () => {
  const store = inject(Store);
  return store.select(CategoryFeature.selectCategoryTreeLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(CategoryActions.loadCategoryTree());
      }
    }),
    filter((loaded) => loaded),
    take(1)
  );
};
