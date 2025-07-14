import { SelectItem } from '@shared/model';

export type FilterProducts = {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  categories?: SelectItem[];
  subCategories?: SelectItem[];
  minStock?: number;
  maxStock?: number;
  isAvailableForDelivery?: boolean;
};
