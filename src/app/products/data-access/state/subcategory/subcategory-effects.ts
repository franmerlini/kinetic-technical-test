import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of } from 'rxjs';

import { CategoryDataClient } from '@products/data-access';

import { SubcategoryActions } from './subcategory-actions';

const loadSubcategories$ = createEffect(
  (actions$ = inject(Actions), categoryDataClient = inject(CategoryDataClient)) =>
    actions$.pipe(
      ofType(SubcategoryActions.loadSubcategories),
      exhaustMap(({ categoryIds }) =>
        categoryDataClient.getSubCategories(categoryIds).pipe(
          map((subcategories) => SubcategoryActions.loadSubcategoriesSuccess({ subcategories })),
          catchError((error) => of(SubcategoryActions.loadSubcategoriesFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const SubcategoryEffects = { loadSubcategories$ };
