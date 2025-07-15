import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { selectCurrentRoute } from '@core/data-access/state/router/router-state';

import { FilterProducts, Product } from '@products/domain';

import { ProductActions } from './product-actions';

interface State extends EntityState<Product> {
  loaded: boolean;
  filters: FilterProducts;
}

const adapter = createEntityAdapter<Product>();

const initialState: State = adapter.getInitialState({
  loaded: false,
  filters: {
    name: null,
    minPrice: null,
    maxPrice: null,
    categories: [],
    subCategories: [],
    minStock: null,
    maxStock: null,
    isAvailableForDelivery: null,
  },
});

export const ProductFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,

    on(ProductActions.loadProductsSuccess, (state, { products }) =>
      adapter.setAll(products, { ...state, loaded: true })
    ),
    on(ProductActions.loadProductsFailure, (state) => ({ ...state, loaded: false })),

    on(ProductActions.loadSelectedProductSuccess, (state, { product }) => adapter.upsertOne(product, state)),

    on(ProductActions.applyFilters, (state, { filters }) => ({ ...state, filters })),
    on(ProductActions.resetFilters, (state) => ({
      ...state,
      filters: {
        name: null,
        minPrice: null,
        maxPrice: null,
        categories: [],
        subCategories: [],
        minStock: null,
        maxStock: null,
        isAvailableForDelivery: null,
      },
    })),

    on(ProductActions.addProductSuccess, (state, { product }) => adapter.addOne(product, state)),

    on(ProductActions.updateProductSuccess, (state, { product }) =>
      adapter.updateOne({ id: product.id, changes: product }, state)
    ),

    on(ProductActions.deleteProductSuccess, (state, { productId }) => adapter.removeOne(productId, state))
  ),
  extraSelectors: ({ selectEntities, selectFilters }) => {
    const selectIsViewMode = createSelector(
      selectCurrentRoute,
      (routerState) => routerState.params['id'] !== undefined && routerState.queryParams['isEdition'] === undefined
    );

    const selectIsEditionMode = createSelector(
      selectCurrentRoute,
      (routerState) => routerState.queryParams['isEdition'] === 'true'
    );

    const selectProducts = createSelector(selectEntities, (entities) => Object.values(entities));

    const selectSelectedProduct = createSelector(
      selectCurrentRoute,
      selectEntities,
      (routerState, entities) => entities[Number(routerState?.params['id'])] ?? null
    );

    const selectFilteredProducts = createSelector(selectProducts, selectFilters, (products, filters) =>
      products.filter(
        (product) =>
          (!filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.minPrice === null || product.price >= filters.minPrice) &&
          (filters.maxPrice === null || product.price <= filters.maxPrice) &&
          (filters.categories.length === 0 ||
            filters.categories.some((cat) => product.categories?.some(({ id }) => id === cat.id))) &&
          (filters.subCategories.length === 0 ||
            filters.subCategories.some((subCat) => product.subCategories?.some(({ id }) => id === subCat.id))) &&
          (filters.minStock === null || product.stock >= filters.minStock) &&
          (filters.maxStock === null || product.stock <= filters.maxStock) &&
          (filters.isAvailableForDelivery === null || product.isAvailableForDelivery === filters.isAvailableForDelivery)
      )
    );

    return { selectIsViewMode, selectIsEditionMode, selectProducts, selectSelectedProduct, selectFilteredProducts };
  },
});
