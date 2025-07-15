import { Params } from '@angular/router';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeatureKeys } from '@core/domain';

type RouterStateUrl = {
  url: string;
  params: Params;
  queryParams: Params;
};

export interface State {
  state: RouterStateUrl;
  navigationId: number;
}

const selectRouterState = createFeatureSelector<State>(FeatureKeys.ROUTER);

export const selectCurrentRoute = createSelector(selectRouterState, (routerState) => routerState?.state);
