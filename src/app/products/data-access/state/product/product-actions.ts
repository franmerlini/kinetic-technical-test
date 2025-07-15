import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FilterProducts, Product, RegisterProduct, UpdateProduct } from '@products/domain';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load products': emptyProps(),
    'Load products success': props<{ products: Product[] }>(),
    'Load products failure': props<{ error: string }>(),

    'Load selected product': props<{ productId: number }>(),
    'Load selected product success': props<{ product: Product }>(),
    'Load selected product failure': props<{ error: string }>(),

    'Apply filters': props<{ filters: FilterProducts }>(),
    'Reset filters': emptyProps(),

    'Add product': props<{ registerProduct: RegisterProduct }>(),
    'Add product success': props<{ product: Product }>(),
    'Add product failure': props<{ error: string }>(),

    'Update product': props<{ updateProduct: UpdateProduct }>(),
    'Update product success': props<{ product: Product }>(),
    'Update product failure': props<{ error: string }>(),

    'Delete product': props<{ productId: number }>(),
    'Delete product success': props<{ productId: number }>(),
    'Delete product failure': props<{ error: string }>(),
  },
});
