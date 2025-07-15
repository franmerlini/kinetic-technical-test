import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, filter, map, of, switchMap, withLatestFrom } from 'rxjs';

import { RouterActions, ToastActions } from '@core/data-access';

import { ProductDataClient, ProductFeature } from '@products/data-access';

import { ProductActions } from './product-actions';

const loadProducts$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), productDataClient = inject(ProductDataClient)) =>
    actions$.pipe(
      ofType(ProductActions.loadProducts),
      withLatestFrom(store.select(ProductFeature.selectLoaded)),
      filter(([, loaded]) => !loaded),
      exhaustMap(() =>
        productDataClient.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    ),
  { functional: true }
);

const loadSelectedProduct$ = createEffect(
  (actions$ = inject(Actions), productDataClient = inject(ProductDataClient)) =>
    actions$.pipe(
      ofType(ProductActions.loadSelectedProduct),
      exhaustMap(({ productId }) =>
        productDataClient.getProduct(productId).pipe(
          map((product) => ProductActions.loadSelectedProductSuccess({ product })),
          catchError((error) => of(ProductActions.loadSelectedProductFailure({ error })))
        )
      )
    ),
  { functional: true }
);

const addProduct$ = createEffect(
  (actions$ = inject(Actions), productDataClient = inject(ProductDataClient)) =>
    actions$.pipe(
      ofType(ProductActions.addProduct),
      exhaustMap(({ registerProduct }) =>
        productDataClient.registerProduct(registerProduct).pipe(
          switchMap((product) => [
            ProductActions.addProductSuccess({ product }),
            ToastActions.showSuccessMessage({ message: '¡Producto registrado con éxito!' }),
            RouterActions.go(['/products']),
          ]),
          catchError((error) => of(ProductActions.addProductFailure({ error })))
        )
      )
    ),
  { functional: true }
);

const updateProduct$ = createEffect(
  (actions$ = inject(Actions), productDataClient = inject(ProductDataClient)) =>
    actions$.pipe(
      ofType(ProductActions.updateProduct),
      exhaustMap(({ updateProduct }) =>
        productDataClient.updateProduct(updateProduct).pipe(
          switchMap((product) => [
            ProductActions.updateProductSuccess({ product }),
            ToastActions.showSuccessMessage({ message: '¡Producto actualizado con éxito!' }),
            RouterActions.go(['/products']),
          ]),
          catchError((error) => of(ProductActions.updateProductFailure({ error })))
        )
      )
    ),
  { functional: true }
);

const deleteProduct$ = createEffect(
  (actions$ = inject(Actions), productDataClient = inject(ProductDataClient)) =>
    actions$.pipe(
      ofType(ProductActions.deleteProduct),
      exhaustMap(({ productId }) =>
        productDataClient.deleteProduct(productId).pipe(
          switchMap(() => [
            ProductActions.deleteProductSuccess({ productId }),
            ToastActions.showSuccessMessage({ message: '¡Producto eliminado con éxito!' }),
            RouterActions.go(['/products']),
          ]),
          catchError((error) => of(ProductActions.deleteProductFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const ProductEffects = { loadProducts$, loadSelectedProduct$, addProduct$, updateProduct$, deleteProduct$ };
