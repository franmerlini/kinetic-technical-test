import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';

import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { SelectItem } from '@shared/model';

import { FilterProducts } from '@products/domain';

// prevents circular dependency
import { FilterProductsForm } from '../filter-products-form/filter-products-form';

type Data = { categories: SelectItem[]; subCategories: SelectItem[]; filters: FilterProducts };

@Component({
  selector: 'app-filter-products-dialog',
  imports: [FilterProductsForm, Button],
  template: `
    <div class="flex flex-col justify-center gap-8">
      <h3 class="text-center">Aplicar filtros</h3>

      <app-filter-products-form
        [categoryList]="config.data.categories"
        [subCategoryList]="config.data.subCategories"
        [filters]="config.data.filters"
      />

      <div class="flex justify-center gap-2">
        <p-button severity="secondary" (click)="ref.close(false)">Cancelar</p-button>
        <p-button (click)="ref.close(form()?.getFilters())">Guardar</p-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterProductsDialog {
  protected readonly form = viewChild(FilterProductsForm);

  protected readonly ref = inject(DynamicDialogRef<FilterProductsDialog>);
  protected readonly config = inject(DynamicDialogConfig) as DynamicDialogConfig<Data>;
}
