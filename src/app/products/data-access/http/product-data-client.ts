import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Product, RegisterProduct, UpdateProduct } from '@products/domain';

const products: Product[] = [
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
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProductDataClient {
  getProducts(): Observable<Product[]> {
    return of(products);
  }

  getProduct(productId: number): Observable<Product | undefined> {
    const product = products.find(({ id }) => id === productId);
    return of(product);
  }

  registerProduct(payload: RegisterProduct): Observable<Product> {
    const newId = products.length ? Math.max(...products.map(({ id }) => id)) + 1 : 1;
    const newProduct = { ...payload, id: newId };
    products.push(newProduct);
    return of(newProduct);
  }

  updateProduct(payload: UpdateProduct): Observable<Product> {
    const index = products.findIndex(({ id }) => id === payload.id);
    products[index] = { ...products[index], ...payload };
    return of(products[index]);
  }
}
