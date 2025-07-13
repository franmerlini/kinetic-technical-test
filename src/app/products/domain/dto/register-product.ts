import { Product } from '../model';

export type RegisterProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
