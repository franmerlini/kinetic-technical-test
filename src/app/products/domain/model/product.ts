import { Category } from './category';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: Category[];
  stock: number;
  isAvailable: boolean;
};
