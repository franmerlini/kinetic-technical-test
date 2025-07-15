import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { combineLatest, filter, take } from 'rxjs';

import { SelectItem } from '@shared/model';
import { DialogService } from '@shared/service';

import { ToastActions } from '@core/data-access';

import {
  CategoryFeature,
  ProductActions,
  ProductFeature,
  SubcategoryActions,
  SubcategoryFeature,
} from '@products/data-access';
import { RegisterProduct, UpdateProduct } from '@products/domain';
import { ProductDetail, ProductForm } from '@products/ui';

@Component({
  selector: 'app-product-item',
  imports: [ProductDetail, ProductForm, AsyncPipe],
  template: `
    @if (vm$ | async; as vm) {
      <div class="flex flex-col gap-8">
        <h1>{{ vm.isViewMode ? 'Detalle de' : vm.isEditionMode ? 'Editar' : 'Registrar' }} producto</h1>
        @if (vm.isViewMode) {
          <app-product-detail [product]="vm.product" (deleteProduct)="deleteProduct($event)" />
        } @else {
          <app-product-form
            [product]="vm.product"
            [categoryList]="vm.categories"
            [subCategoryList]="vm.subcategories"
            (selectCategories)="filterSubCategories($event)"
            (registerProduct)="registerProduct($event)"
            (updateProduct)="updateProduct($event)"
            (formError)="showError($event)"
          />
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItem {
  readonly #dialogService = inject(DialogService);
  readonly #store = inject(Store);

  protected readonly vm$ = combineLatest({
    isViewMode: this.#store.select(ProductFeature.selectIsViewMode),
    isEditionMode: this.#store.select(ProductFeature.selectIsEditionMode),
    product: this.#store.select(ProductFeature.selectSelectedProduct),
    categories: this.#store.select(CategoryFeature.selectCategories),
    subcategories: this.#store.select(SubcategoryFeature.selectSubcategories),
  });

  filterSubCategories(categories: SelectItem[]): void {
    this.#store.dispatch(SubcategoryActions.loadSubcategories({ categoryIds: categories.map(({ id }) => id) }));
  }

  registerProduct(registerProduct: RegisterProduct): void {
    this.#store.dispatch(ProductActions.addProduct({ registerProduct }));
  }

  updateProduct(updateProduct: UpdateProduct): void {
    this.#store.dispatch(ProductActions.updateProduct({ updateProduct }));
  }

  deleteProduct(productId: number): void {
    this.#dialogService
      .openWarning('¿Está seguro que desea eliminar este producto?')
      .onClose.pipe(take(1), filter(Boolean))
      .subscribe(() => this.#store.dispatch(ProductActions.deleteProduct({ productId })));
  }

  showError(error: string): void {
    this.#store.dispatch(ToastActions.showErrorMessage({ message: error }));
  }
}
