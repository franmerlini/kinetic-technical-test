import { createActionGroup, props } from '@ngrx/store';

export const ToastActions = createActionGroup({
  source: 'Toast',
  events: {
    'Show error message': props<{ message: string }>(),
    'Show info message': props<{ message: string }>(),
    'Show success message': props<{ message: string }>(),
    'Show warning message': props<{ message: string }>(),
  },
});
