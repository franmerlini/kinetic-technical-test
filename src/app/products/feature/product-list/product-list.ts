import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';

import { filter, switchMap, take } from 'rxjs';

import { DialogService, ToastService } from '@shared/service';

import { CategoryDataClient, ProductDataClient } from '@products/data-access';
import { FilterProducts } from '@products/domain';
import { FilterProductsDialog, ProductCard } from '@products/ui';

@Component({
  selector: 'app-product-list',
  imports: [Button, RouterLink, AsyncPipe, ProductCard],
  template: `
    <div class="flex flex-col gap-8">
      <h1>Listado de productos</h1>

      <div class="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <p-button severity="secondary" label="Quitar filtros" icon="pi pi-times" fluid (onClick)="resetFilters()" />
        <p-button
          severity="secondary"
          label="Aplicar filtros"
          icon="pi pi-sliders-h"
          fluid
          (onClick)="applyFilters()"
        />
        <p-button label="Agregar" icon="pi pi-plus" fluid routerLink="new" />
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        @for (product of products$ | async; track product.id) {
          <app-product-card [product]="product" (deleteProduct)="deleteProduct($event)" />
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  readonly #productDataClient = inject(ProductDataClient);
  readonly #dialogService = inject(DialogService);
  readonly #categoryDataClient = inject(CategoryDataClient);
  readonly #toastService = inject(ToastService);

  protected readonly products$ = this.#productDataClient.getFilteredProducts();
  readonly categoryTree = toSignal(this.#categoryDataClient.getCategoryTree());
  readonly filters = toSignal(this.#productDataClient.getFilters());

  resetFilters(): void {
    this.#productDataClient.resetFilters();
  }

  applyFilters(): void {
    this.#dialogService
      .openFromComponent(FilterProductsDialog, { categoryTree: this.categoryTree(), filters: this.filters() })
      .onClose.pipe(
        take(1),
        filter((filterProducts: FilterProducts) => !!filterProducts),
        switchMap((filterProducts) => this.#productDataClient.filterProducts(filterProducts))
      )
      .subscribe();
  }

  deleteProduct(productId: number): void {
    this.#dialogService
      .openWarning('¿Está seguro que desea eliminar este producto?')
      .onClose.pipe(
        take(1),
        filter(Boolean),
        switchMap(() => this.#productDataClient.deleteProduct(productId))
      )
      .subscribe(() => {
        this.#toastService.showSuccess('¡Producto eliminado con éxito!');
      });
  }
}
