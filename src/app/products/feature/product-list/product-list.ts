import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';

import { filter, switchMap, take } from 'rxjs';

import { DialogService, ToastService } from '@shared/service';

import { ProductDataClient } from '@products/data-access';
import { ProductCard } from '@products/ui';

@Component({
  selector: 'app-product-list',
  imports: [Button, RouterLink, AsyncPipe, ProductCard],
  template: `
    <div class="flex flex-col gap-8">
      <h1>Listado de productos</h1>

      <div class="flex justify-end">
        <p-button label="Agregar" icon="pi pi-plus" routerLink="new" />
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
  readonly #toastService = inject(ToastService);

  protected readonly products$ = this.#productDataClient.getProducts();

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
