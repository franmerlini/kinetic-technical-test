import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { SelectItem } from '@shared/model';

import { SubcategoryActions } from './subcategory-actions';

interface State extends EntityState<SelectItem> {
  loaded: boolean;
}

const adapter = createEntityAdapter<SelectItem>();

const initialState: State = adapter.getInitialState({
  loaded: false,
});

export const SubcategoryFeature = createFeature({
  name: 'subcategory',
  reducer: createReducer(
    initialState,

    on(SubcategoryActions.loadSubcategoriesSuccess, (state, { subcategories }) =>
      adapter.setAll(subcategories, { ...state, loaded: true })
    ),
    on(SubcategoryActions.loadSubcategoriesFailure, (state) => ({ ...state, loaded: false }))
  ),
  extraSelectors: ({ selectEntities }) => ({
    selectSubcategories: createSelector(selectEntities, (entities) => Object.values(entities)),
  }),
});
