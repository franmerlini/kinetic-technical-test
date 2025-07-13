import { SelectItem } from '@shared/model';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: SelectItem[];
  subCategories?: SelectItem[];
  stock: number;
  isAvailableForDelivery: boolean;
};
