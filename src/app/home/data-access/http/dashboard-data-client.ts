import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { DashboardData } from '@home/domain';

import { ProductDataClient } from '@products/data-access';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataClient {
  readonly #productDataClient = inject(ProductDataClient);

  getDashboardData(): Observable<DashboardData> {
    return this.#productDataClient.getProducts().pipe(
      map((products) => ({
        productsCount: products.length,
        lowOnStockProductsCount: products.filter(({ stock }) => stock < 5 && stock > 0).length,
        outOfStockProductsCount: products.filter(({ stock }) => stock === 0).length,
        stockValue: products.reduce((total, { price, stock }) => total + price * stock, 0),
      }))
    );
  }

  getStockByProduct(): Observable<{ name: string; stock: number }[]> {
    return this.#productDataClient
      .getProducts()
      .pipe(map((products) => products.map(({ name, stock }) => ({ name, stock }))));
  }

  getStockValueDistribution(): Observable<{ name: string; value: number }[]> {
    return this.#productDataClient
      .getProducts()
      .pipe(map((products) => products.map(({ name, stock, price }) => ({ name, value: stock * price }))));
  }
}
