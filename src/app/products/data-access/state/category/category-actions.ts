import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { SelectItem, TreeNode } from '@shared/model';

export const CategoryActions = createActionGroup({
  source: 'Category',
  events: {
    'Load categories': emptyProps(),
    'Load categories success': props<{ categories: SelectItem[] }>(),
    'Load categories failure': props<{ error: string }>(),

    'Load category tree': emptyProps(),
    'Load category tree success': props<{ categoryTree: TreeNode<SelectItem>[] }>(),
    'Load category tree failure': props<{ error: string }>(),
  },
});
