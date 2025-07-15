import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { PrimeIcons } from 'primeng/api';
import { Button } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';

import { combineLatest, filter, firstValueFrom, take } from 'rxjs';

import { DialogService } from '@shared/service';

import { CategoryFeature, ProductActions, ProductFeature } from '@products/data-access';
import { FilterProducts } from '@products/domain';
import { FilterProductsDialog, ProductCard, ProductsTable } from '@products/ui';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, SelectButton, FormsModule, Button, RouterLink, ProductCard, ProductsTable],
  template: `
    @if (vm$ | async; as vm) {
      <div class="flex flex-col gap-8">
        <h1>Listado de productos</h1>

        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <div class="flex flex-col gap-2 sm:flex-row">
            <p-selectbutton [options]="layoutOptions" [(ngModel)]="layoutMode" optionValue="value">
              <ng-template #item let-item>
                <i [class]="item.icon"></i>
              </ng-template>
            </p-selectbutton>
          </div>
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
        </div>

        @if (layoutMode === 'cards') {
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            @for (product of vm.products; track product.id) {
              <app-product-card
                [product]="product"
                (viewProduct)="viewProduct($event)"
                (updateProduct)="updateProduct($event)"
                (deleteProduct)="deleteProduct($event)"
              />
            }
          </div>
        } @else {
          <app-products-table
            [products]="vm.products"
            [columns]="['id', 'nombre', 'precio', 'stock', 'acciones']"
            (viewProduct)="viewProduct($event)"
            (updateProduct)="updateProduct($event)"
            (deleteProduct)="deleteProduct($event)"
          />
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList implements OnInit {
  readonly #dialogService = inject(DialogService);
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  protected readonly vm$ = combineLatest({
    products: this.#store.select(ProductFeature.selectFilteredProducts),
  });
  protected readonly layoutOptions = [
    { value: 'table', icon: PrimeIcons.LIST },
    { value: 'cards', icon: PrimeIcons.TH_LARGE },
  ];
  protected readonly layoutMode = 'cards';

  ngOnInit(): void {
    this.#store.dispatch(ProductActions.loadProducts());
  }

  resetFilters(): void {
    this.#store.dispatch(ProductActions.resetFilters());
  }

  async applyFilters(): Promise<void> {
    const { filters, categoryTree } = await firstValueFrom(
      combineLatest({
        filters: this.#store.select(ProductFeature.selectFilters),
        categoryTree: this.#store.select(CategoryFeature.selectCategoryTree),
      })
    );
    this.#dialogService
      .openFromComponent(FilterProductsDialog, { filters, categoryTree })
      .onClose.pipe(
        take(1),
        filter((filters: FilterProducts) => !!filters)
      )
      .subscribe((filters) => this.#store.dispatch(ProductActions.applyFilters({ filters })));
  }

  viewProduct(productId: number): void {
    this.#router.navigate(['products', productId]);
  }

  updateProduct(productId: number): void {
    this.#router.navigate(['products', productId], { queryParams: { isEdition: true } });
  }

  deleteProduct(productId: number): void {
    this.#dialogService
      .openWarning('¿Está seguro que desea eliminar este producto?')
      .onClose.pipe(take(1), filter(Boolean))
      .subscribe(() => {
        this.#store.dispatch(ProductActions.deleteProduct({ productId }));
      });
  }
}
