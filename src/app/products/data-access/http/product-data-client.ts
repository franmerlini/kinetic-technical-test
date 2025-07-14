import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { FilterProducts, Product, RegisterProduct, UpdateProduct } from '@products/domain';

@Injectable({
  providedIn: 'root',
})
export class ProductDataClient {
  readonly #products = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'Gato hidráulico de piso',
      description:
        'Gato hidráulico de 3 toneladas con diseño de perfil bajo para levantar vehículos. Incluye válvula de seguridad y construcción de acero duradero.',
      price: 149.99,
      imageUrl:
        'https://imgs.search.brave.com/1tb0hVLVW2gl_1qofjWfW5oWE57nKdeu1XGCcowihRY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bWFub21hbm8uY29t/L2FyZWJvcy1nYXRv/LWhpZHJhdWxpY28t/ZGUtbWFuaW9icmEt/M3QtamFjay1jb24t/cGVkYWwteS10YWNv/cy1kZS1nb21hLVAt/NDMwNDI3Ni05NDE2/MDM5N18xLmpwZw',
      categories: [{ id: 1, name: 'Equipos de elevación' }],
      subCategories: [
        { id: 101, name: 'Gatos hidráulicos', parendId: 1 },
        { id: 102, name: 'Gatos mecánicos', parendId: 1 },
      ],
      stock: 15,
      isAvailableForDelivery: true,
      createdAt: new Date('2025-07-04T20:06:06.780Z'),
      updatedAt: new Date('2025-07-04T20:06:06.780Z'),
    },
    {
      id: 2,
      name: 'Llave de impacto inalámbrica',
      description:
        'Llave de impacto inalámbrica de 20V con torque de 300 ft-lbs. Incluye gatillo de velocidad variable y luz LED para trabajos precisos.',
      price: 199.95,
      imageUrl:
        'https://imgs.search.brave.com/A3jV4i2lX-PhlA2BwIquzhGqor0zzkWNzbwdQvwHVjg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzkzMzE3NC1NTEE4/MDI1NjMyMDkxOF8x/MTIwMjQtRS53ZWJw',
      categories: [{ id: 2, name: 'Herramientas eléctricas' }],
      subCategories: [
        { id: 201, name: 'Llaves de impacto', parendId: 2 },
        { id: 202, name: 'Taladros', parendId: 2 },
      ],
      stock: 10,
      isAvailableForDelivery: true,
      createdAt: new Date('2025-07-12T20:06:06.780Z'),
      updatedAt: new Date('2025-07-12T20:06:06.780Z'),
    },
    {
      id: 3,
      name: 'Escáner diagnóstico OBD-II',
      description:
        'Escáner OBD-II avanzado para leer y borrar códigos de error de vehículos. Soporta múltiples protocolos y monitoreo de datos en tiempo real.',
      price: 89.99,
      imageUrl:
        'https://imgs.search.brave.com/Q1ipKw2zSmTMU2alMBF9t9DB5HilKjxp6-8M7b06RUA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFCemE2cjh0cEwu/anBn',
      categories: [{ id: 3, name: 'Herramientas de diagnóstico' }],
      subCategories: [
        { id: 301, name: 'Lectores de códigos', parendId: 3 },
        { id: 302, name: 'Escáneres avanzados', parendId: 3 },
      ],
      stock: 25,
      isAvailableForDelivery: true,
      createdAt: new Date('2025-07-10T20:06:16.780Z'),
      updatedAt: new Date('2025-07-10T20:06:16.780Z'),
    },
  ]);
  readonly #filteredProducts = new BehaviorSubject<Product[]>(this.#products.getValue());
  readonly #filters = new BehaviorSubject<FilterProducts>({});

  getProducts(): Observable<Product[]> {
    return this.#products.asObservable();
  }

  getProduct(productId: number): Observable<Product | undefined> {
    return of(this.#products.getValue().find(({ id }) => id === productId));
  }

  registerProduct(payload: RegisterProduct): Observable<Product> {
    const products = this.#products.getValue();
    const newId = products.length ? Math.max(...products.map(({ id }) => id)) + 1 : 1;
    const newProduct: Product = { ...payload, id: newId, createdAt: new Date(), updatedAt: new Date() };
    this.#products.next([...products, newProduct]);
    return of(newProduct);
  }

  updateProduct(payload: UpdateProduct): Observable<Product> {
    const currentProducts = this.#products.getValue();
    const productToUpdate = currentProducts.find(({ id }) => id === payload.id);
    const updatedProduct: Product = { ...productToUpdate, ...payload, updatedAt: new Date() };
    const updatedProducts = currentProducts.map((product) => (product.id === payload.id ? updatedProduct : product));
    this.#products.next(updatedProducts);
    return of(updatedProduct);
  }

  deleteProduct(productId: number): Observable<void> {
    const currentProducts = this.#products.getValue();
    const updatedProducts = currentProducts.filter(({ id }) => id !== productId);
    this.#products.next(updatedProducts);
    return of(null);
  }

  getFilters(): Observable<FilterProducts> {
    return this.#filters.asObservable();
  }

  getFilteredProducts(): Observable<Product[]> {
    return this.#filteredProducts.asObservable();
  }

  filterProducts(filters: FilterProducts): Observable<void> {
    this.#filters.next(filters);
    const filtered = this.#products
      .getValue()
      .filter(
        (product) =>
          (!filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.minPrice === null || product.price >= filters.minPrice) &&
          (filters.maxPrice === null || product.price <= filters.maxPrice) &&
          (filters.categories.length === 0 ||
            filters.categories.some((cat) => product.categories?.some(({ id }) => id === cat.id))) &&
          (filters.subCategories.length === 0 ||
            filters.subCategories.some((subCat) => product.subCategories?.some(({ id }) => id === subCat.id))) &&
          (filters.minStock === null || product.stock >= filters.minStock) &&
          (filters.maxStock === null || product.stock <= filters.maxStock) &&
          (filters.isAvailableForDelivery === null || product.isAvailableForDelivery === filters.isAvailableForDelivery)
      );
    this.#filteredProducts.next(filtered);
    return of(undefined);
  }

  resetFilters(): void {
    this.#filters.next({});
    this.#filteredProducts.next(this.#products.getValue());
  }
}
