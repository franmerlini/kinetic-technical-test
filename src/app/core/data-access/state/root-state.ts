import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { RouterEffects, State as RouterState } from '@core/data-access/state/router';
import { ToastEffects } from '@core/data-access/state/toast';
import { FeatureKeys } from '@core/domain';

type State = {
  [FeatureKeys.ROUTER]: RouterState;
};

const ROOT_REDUCERS: ActionReducerMap<State> = {
  [FeatureKeys.ROUTER]: routerReducer,
};

const ROOT_EFFECTS = [RouterEffects, ToastEffects];

export { ROOT_REDUCERS, ROOT_EFFECTS };
