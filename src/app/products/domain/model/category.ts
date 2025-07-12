import { SelectItem } from '@shared/model';

export type Category = SelectItem & {
  subCategory: SelectItem;
};
