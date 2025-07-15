import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { filter, take, tap } from 'rxjs';

import { CategoryActions, CategoryFeature } from '@products/data-access';

export const categoriesLoadedGuard: CanActivateFn = () => {
  const store = inject(Store);
  return store.select(CategoryFeature.selectLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(CategoryActions.loadCategories());
      }
    }),
    filter((loaded) => loaded),
    take(1)
  );
};
