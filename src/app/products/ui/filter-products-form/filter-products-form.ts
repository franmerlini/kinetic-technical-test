import { ChangeDetectionStrategy, Component, effect, inject, input, model } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Tree } from 'primeng/tree';

import { SelectItem, TreeNode } from '@shared/model';
import { Checkbox, InputNumber, InputText } from '@shared/ui';

import { FilterProducts } from '@products/domain';

const FORM_KEYS = {
  name: 'name',
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
  categories: 'categories',
  subCategories: 'subCategories',
  minStock: 'minStock',
  maxStock: 'maxStock',
  isAvailableForDelivery: 'isAvailableForDelivery',
} as const;

type Form = {
  [FORM_KEYS.name]: FormControl<string | null>;
  [FORM_KEYS.minPrice]: FormControl<number | null>;
  [FORM_KEYS.maxPrice]: FormControl<number | null>;
  [FORM_KEYS.categories]: FormControl<SelectItem[] | null>;
  [FORM_KEYS.subCategories]?: FormControl<SelectItem[] | null>;
  [FORM_KEYS.minStock]: FormControl<number | null>;
  [FORM_KEYS.maxStock]: FormControl<number | null>;
  [FORM_KEYS.isAvailableForDelivery]: FormControl<boolean | null>;
};

@Component({
  selector: 'app-filter-products-form',
  imports: [ReactiveFormsModule, InputText, InputNumber, Tree, Checkbox],
  templateUrl: './filter-products-form.html',
  styleUrl: './filter-products-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterProductsForm {
  readonly categoryTree = input.required<TreeNode<SelectItem>[]>();
  readonly filters = input.required<FilterProducts>();

  readonly selectedCategories = model<TreeNode<SelectItem>[]>();

  readonly #fb = inject(FormBuilder);

  constructor() {
    effect(() => {
      const { name, minPrice, maxPrice, categories, subCategories, minStock, maxStock, isAvailableForDelivery } =
        this.filters() || {};
      this.form.patchValue({
        [FORM_KEYS.name]: name || null,
        [FORM_KEYS.minPrice]: minPrice || null,
        [FORM_KEYS.maxPrice]: maxPrice || null,
        [FORM_KEYS.categories]: categories || [],
        [FORM_KEYS.subCategories]: subCategories || [],
        [FORM_KEYS.minStock]: minStock || null,
        [FORM_KEYS.maxStock]: maxStock || null,
        [FORM_KEYS.isAvailableForDelivery]: isAvailableForDelivery || null,
      });
    });

    effect(() => {
      const selectedCategories = this.selectedCategories();
      if (selectedCategories) {
        const categories = selectedCategories.filter((node) => node.parent === undefined).map(({ data }) => data);
        const subCategories = selectedCategories.filter((node) => node.parent !== undefined).map(({ data }) => data);
        this.form.patchValue({ [FORM_KEYS.categories]: categories, [FORM_KEYS.subCategories]: subCategories });
      }
    });
  }

  protected readonly form = this.#fb.group<Form>({
    [FORM_KEYS.name]: this.#fb.control(null),
    [FORM_KEYS.minPrice]: this.#fb.control(null),
    [FORM_KEYS.maxPrice]: this.#fb.control(null),
    [FORM_KEYS.categories]: this.#fb.control([]),
    [FORM_KEYS.subCategories]: this.#fb.control([]),
    [FORM_KEYS.minStock]: this.#fb.control(null),
    [FORM_KEYS.maxStock]: this.#fb.control(null),
    [FORM_KEYS.isAvailableForDelivery]: this.#fb.control(null),
  });
  protected readonly formKeys = FORM_KEYS;

  getFilters(): FilterProducts {
    const { name, minPrice, maxPrice, categories, subCategories, minStock, maxStock, isAvailableForDelivery } =
      this.form.getRawValue();
    return { name, minPrice, maxPrice, categories, subCategories, minStock, maxStock, isAvailableForDelivery };
  }

  get name(): FormControl<string | null> {
    return this.form.get(FORM_KEYS.name) as FormControl<string | null>;
  }

  get minPrice(): FormControl<number | null> {
    return this.form.get(FORM_KEYS.minPrice) as FormControl<number | null>;
  }

  get maxPrice(): FormControl<number | null> {
    return this.form.get(FORM_KEYS.maxPrice) as FormControl<number | null>;
  }

  get categories(): FormControl<SelectItem[] | null> {
    return this.form.get(FORM_KEYS.categories) as FormControl<SelectItem[] | null>;
  }

  get subCategories(): FormControl<SelectItem[] | null> {
    return this.form.get(FORM_KEYS.subCategories) as FormControl<SelectItem[] | null>;
  }

  get minStock(): FormControl<number | null> {
    return this.form.get(FORM_KEYS.minStock) as FormControl<number | null>;
  }

  get maxStock(): FormControl<number | null> {
    return this.form.get(FORM_KEYS.maxStock) as FormControl<number | null>;
  }

  get isAvailableForDelivery(): FormControl<boolean | null> {
    return this.form.get(FORM_KEYS.isAvailableForDelivery) as FormControl<boolean | null>;
  }
}
