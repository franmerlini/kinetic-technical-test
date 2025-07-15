import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs';

import { ToastService } from '@shared/service';

import { ToastActions } from './toast-actions';

const showErrorMessage$ = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(ToastActions.showErrorMessage),
      tap(({ message }) => toastService.showError(message))
    ),
  { functional: true, dispatch: false }
);

const showInfoMessage$ = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(ToastActions.showInfoMessage),
      tap(({ message }) => toastService.showInfo(message))
    ),
  { functional: true, dispatch: false }
);

const showSuccessMessage$ = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(ToastActions.showSuccessMessage),
      tap(({ message }) => toastService.showSuccess(message))
    ),
  { functional: true, dispatch: false }
);

const showWarningMessage$ = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(ToastActions.showWarningMessage),
      tap(({ message }) => toastService.showWarning(message))
    ),
  { functional: true, dispatch: false }
);

export const ToastEffects = { showErrorMessage$, showInfoMessage$, showSuccessMessage$, showWarningMessage$ };
