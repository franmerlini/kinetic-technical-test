import { RegisterProduct } from './register-product';

export type UpdateProduct = RegisterProduct & {
  id: number;
};
