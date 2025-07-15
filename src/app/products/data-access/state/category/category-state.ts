import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { SelectItem, TreeNode } from '@shared/model';

import { CategoryActions } from './category-actions';

interface State extends EntityState<SelectItem> {
  loaded: boolean;
  categoryTree: TreeNode<SelectItem>[];
  categoryTreeLoaded: boolean;
}

const adapter = createEntityAdapter<SelectItem>();

const initialState: State = adapter.getInitialState({
  loaded: false,
  categoryTree: [],
  categoryTreeLoaded: false,
});

export const CategoryFeature = createFeature({
  name: 'category',
  reducer: createReducer(
    initialState,

    on(CategoryActions.loadCategoriesSuccess, (state, { categories }) =>
      adapter.setAll(categories, { ...state, loaded: true })
    ),
    on(CategoryActions.loadCategoriesFailure, (state) => ({ ...state, loaded: false })),

    on(CategoryActions.loadCategoryTreeSuccess, (state, { categoryTree }) => ({
      ...state,
      categoryTree,
      categoryTreeLoaded: true,
    })),
    on(CategoryActions.loadCategoryTreeFailure, (state) => ({ ...state, categoryTreeLoaded: false }))
  ),
  extraSelectors: ({ selectEntities }) => ({
    selectCategories: createSelector(selectEntities, (entities) => Object.values(entities)),
  }),
});
