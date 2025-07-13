import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  numberAttribute,
  input as routeInput,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { filter, switchMap, take } from 'rxjs';

import { SelectItem } from '@shared/model';
import { DialogService, ToastService } from '@shared/service';

import { CategoryDataClient, ProductDataClient } from '@products/data-access';
import { RegisterProduct, UpdateProduct } from '@products/domain';
import { ProductDetail, ProductForm } from '@products/ui';

@Component({
  selector: 'app-product-item',
  imports: [ProductDetail, ProductForm, AsyncPipe],
  template: `
    <div class="flex flex-col gap-8">
      <h1>{{ isViewMode() ? 'Detalle de' : isEdition() ? 'Editar' : 'Registrar' }} producto</h1>
      @if (isViewMode()) {
        <app-product-detail [product]="product$ | async" (deleteProduct)="deleteProduct($event)" />
      } @else {
        <app-product-form
          [product]="product$ | async"
          [categoryList]="categories()"
          [subCategoryList]="subCategories()"
          (selectCategories)="filterSubCategories($event)"
          (registerProduct)="registerProduct($event)"
          (updateProduct)="updateProduct($event)"
          (formError)="toastService.showError($event)"
        />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItem {
  readonly id = routeInput(undefined, { transform: numberAttribute });
  readonly isEdition = routeInput(undefined, { transform: booleanAttribute });

  readonly #productDataClient = inject(ProductDataClient);
  readonly #categoryDataClient = inject(CategoryDataClient);
  protected readonly toastService = inject(ToastService);
  readonly #router = inject(Router);
  readonly #dialogService = inject(DialogService);

  protected readonly product$ = toObservable(this.id).pipe(switchMap((id) => this.#productDataClient.getProduct(id)));
  protected readonly categories = toSignal(this.#categoryDataClient.getCategories());
  protected readonly subCategories = signal<SelectItem[]>([]);
  protected readonly isViewMode = computed(() => !this.isEdition() && !!this.id());

  filterSubCategories(categories: SelectItem[]): void {
    if (categories.length === 0) {
      this.subCategories.set([]);
      return;
    }
    this.#categoryDataClient
      .getSubCategories(categories.map(({ id }) => id))
      .pipe(take(1))
      .subscribe((subCategories) => this.subCategories.set(subCategories));
  }

  registerProduct(registerProduct: RegisterProduct): void {
    this.#productDataClient
      .registerProduct(registerProduct)
      .pipe(take(1))
      .subscribe(() => {
        this.toastService.showSuccess('¡Producto registrado con éxito!');
        this.#router.navigate(['/products']);
      });
  }

  updateProduct(updateProduct: UpdateProduct): void {
    this.#productDataClient
      .updateProduct(updateProduct)
      .pipe(take(1))
      .subscribe(() => {
        this.toastService.showSuccess('¡Producto actualizado con éxito!');
        this.#router.navigate(['/products']);
      });
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
        this.toastService.showSuccess('¡Producto eliminado con éxito!');
        this.#router.navigate(['/products']);
      });
  }
}
