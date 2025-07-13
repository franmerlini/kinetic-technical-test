import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Button } from 'primeng/button';

import { SelectItem } from '@shared/model';
import { Checkbox, InputNumber, InputText, MultiSelect, Textarea } from '@shared/ui';

import { Product, RegisterProduct, UpdateProduct } from '@products/domain';

const FORM_KEYS = {
  name: 'name',
  description: 'description',
  price: 'price',
  imageUrl: 'imageUrl',
  categories: 'categories',
  subCategories: 'subCategories',
  stock: 'stock',
  isAvailableForDelivery: 'isAvailableForDelivery',
} as const;

type Form = {
  [FORM_KEYS.name]: FormControl<string | null>;
  [FORM_KEYS.description]: FormControl<string | null>;
  [FORM_KEYS.price]: FormControl<number | null>;
  [FORM_KEYS.imageUrl]: FormControl<string | null>;
  [FORM_KEYS.categories]: FormControl<SelectItem[] | null>;
  [FORM_KEYS.subCategories]?: FormControl<SelectItem[] | null>;
  [FORM_KEYS.stock]: FormControl<number | null>;
  [FORM_KEYS.isAvailableForDelivery]: FormControl<boolean | null>;
};

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, InputText, Textarea, InputNumber, MultiSelect, Checkbox, Button],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm implements OnInit {
  readonly product = input<Product | undefined>();
  readonly categoryList = input.required<SelectItem[]>();
  readonly subCategoryList = input<SelectItem[]>([]);

  readonly selectCategories = output<SelectItem[]>();
  readonly registerProduct = output<RegisterProduct>();
  readonly updateProduct = output<UpdateProduct>();
  readonly formError = output<string>();

  readonly #fb = inject(FormBuilder);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const { name, description, price, imageUrl, categories, subCategories, stock, isAvailableForDelivery } =
        this.product() || {};
      this.form.patchValue({
        [FORM_KEYS.name]: name || null,
        [FORM_KEYS.description]: description || null,
        [FORM_KEYS.price]: price || null,
        [FORM_KEYS.imageUrl]: imageUrl || null,
        [FORM_KEYS.categories]: categories || [],
        [FORM_KEYS.subCategories]: subCategories || [],
        [FORM_KEYS.stock]: stock || null,
        [FORM_KEYS.isAvailableForDelivery]: isAvailableForDelivery ?? true,
      });
    });
  }

  ngOnInit(): void {
    this.categories.valueChanges
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((categories) => this.selectCategories.emit(categories));
  }

  protected readonly form = this.#fb.group<Form>({
    [FORM_KEYS.name]: this.#fb.control(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    [FORM_KEYS.description]: this.#fb.control(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    [FORM_KEYS.price]: this.#fb.control(null, [Validators.required, Validators.min(0.01), Validators.max(10000)]),
    [FORM_KEYS.imageUrl]: this.#fb.control(null, [Validators.required]),
    [FORM_KEYS.categories]: this.#fb.control([], [Validators.required]),
    [FORM_KEYS.subCategories]: this.#fb.control([]),
    [FORM_KEYS.stock]: this.#fb.control(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
    [FORM_KEYS.isAvailableForDelivery]: this.#fb.control(true, [Validators.required]),
  });
  protected readonly formKeys = FORM_KEYS;

  resetForm(): void {
    this.form.reset({
      [FORM_KEYS.name]: null,
      [FORM_KEYS.description]: null,
      [FORM_KEYS.price]: null,
      [FORM_KEYS.imageUrl]: null,
      [FORM_KEYS.categories]: [],
      [FORM_KEYS.subCategories]: [],
      [FORM_KEYS.stock]: null,
      [FORM_KEYS.isAvailableForDelivery]: true,
    });
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formError.emit('Revise los campos del formulario.');
      return;
    }
    const { name, description, price, imageUrl, categories, subCategories, stock, isAvailableForDelivery } =
      this.form.getRawValue();
    const payload: RegisterProduct | UpdateProduct = {
      name,
      description,
      price,
      imageUrl,
      categories,
      subCategories,
      stock,
      isAvailableForDelivery,
    };
    const product = this.product();
    if (product) {
      this.updateProduct.emit({ id: product.id, ...payload });
      return;
    }
    this.registerProduct.emit({ ...payload });
  }

  get name(): FormControl<string | null> {
    return this.form.get(FORM_KEYS.name) as FormControl<string | null>;
  }

  get description(): FormControl<string | null> {
    return this.form.get(FORM_KEYS.description) as FormControl<string | null>;
  }

  get price(): FormControl<number | null> {
    return this.form.get(FORM_KEYS.price) as FormControl<number | null>;
  }

  get imageUrl(): FormControl<string | null> {
    return this.form.get(FORM_KEYS.imageUrl) as FormControl<string | null>;
  }

  get categories(): FormControl<SelectItem[] | null> {
    return this.form.get(FORM_KEYS.categories) as FormControl<SelectItem[] | null>;
  }

  get subCategories(): FormControl<SelectItem[] | null> | undefined {
    return this.form.get(FORM_KEYS.subCategories) as FormControl<SelectItem[] | null> | undefined;
  }

  get stock(): FormControl<number | null> {
    return this.form.get(FORM_KEYS.stock) as FormControl<number | null>;
  }

  get isAvailableForDelivery(): FormControl<boolean | null> {
    return this.form.get(FORM_KEYS.isAvailableForDelivery) as FormControl<boolean | null>;
  }
}
