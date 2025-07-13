import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  inject,
  numberAttribute,
  input as routeInput,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { switchMap, take } from 'rxjs';

import { SelectItem } from '@shared/model';

import { CategoryDataClient, ProductDataClient } from '@products/data-access';
import { RegisterProduct, UpdateProduct } from '@products/domain';
import { ProductForm } from '@products/ui';

@Component({
  selector: 'app-product-item',
  imports: [ProductForm, AsyncPipe],
  template: `
    <div class="flex flex-col gap-8">
      <h1>{{ isEdition() ? 'Editar' : 'Registrar' }} producto</h1>
      <app-product-form
        [product]="product$ | async"
        [categoryList]="categories()"
        [subCategoryList]="subCategories()"
        (selectCategories)="filterSubCategories($event)"
        (registerProduct)="registerProduct($event)"
        (updateProduct)="updateProduct($event)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItem {
  readonly id = routeInput(undefined, { transform: numberAttribute });
  readonly isEdition = routeInput(undefined, { transform: booleanAttribute });

  readonly #productDataClient = inject(ProductDataClient);
  readonly #categoryDataClient = inject(CategoryDataClient);
  readonly #router = inject(Router);

  protected readonly product$ = toObservable(this.id).pipe(switchMap((id) => this.#productDataClient.getProduct(id)));
  protected readonly categories = toSignal(this.#categoryDataClient.getCategories());
  protected readonly subCategories = signal<SelectItem[]>([]);

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
        this.#router.navigate(['/products']);
      });
  }

  updateProduct(updateProduct: UpdateProduct): void {
    this.#productDataClient
      .updateProduct(updateProduct)
      .pipe(take(1))
      .subscribe(() => {
        this.#router.navigate(['/products']);
      });
  }
}
