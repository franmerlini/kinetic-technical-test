import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of } from 'rxjs';

import { CategoryDataClient } from '@products/data-access';

import { CategoryActions } from './category-actions';

const loadCategories$ = createEffect(
  (actions$ = inject(Actions), categoryDataClient = inject(CategoryDataClient)) =>
    actions$.pipe(
      ofType(CategoryActions.loadCategories),
      exhaustMap(() =>
        categoryDataClient.getCategories().pipe(
          map((categories) => CategoryActions.loadCategoriesSuccess({ categories })),
          catchError((error) => of(CategoryActions.loadCategoriesFailure({ error })))
        )
      )
    ),
  { functional: true }
);

const loadCategoryTree$ = createEffect(
  (actions$ = inject(Actions), categoryDataClient = inject(CategoryDataClient)) =>
    actions$.pipe(
      ofType(CategoryActions.loadCategoryTree),
      exhaustMap(() =>
        categoryDataClient.getCategoryTree().pipe(
          map((categoryTree) => CategoryActions.loadCategoryTreeSuccess({ categoryTree })),
          catchError((error) => of(CategoryActions.loadCategoryTreeFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const CategoryEffects = { loadCategories$, loadCategoryTree$ };
