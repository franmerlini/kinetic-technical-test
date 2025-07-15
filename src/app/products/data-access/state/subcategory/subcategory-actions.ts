import { createActionGroup, props } from '@ngrx/store';

import { SelectItem } from '@shared/model';

export const SubcategoryActions = createActionGroup({
  source: 'Subcategory',
  events: {
    'Load subcategories': props<{ categoryIds: number[] }>(),
    'Load subcategories success': props<{ subcategories: SelectItem[] }>(),
    'Load subcategories failure': props<{ error: string }>(),
  },
});
