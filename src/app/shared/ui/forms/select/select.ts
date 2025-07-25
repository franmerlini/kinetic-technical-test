import { ChangeDetectionStrategy, Component, DoCheck, inject, input, signal } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Select as PrimengSelect } from 'primeng/select';

import { SelectItem } from '@shared/model';
import { getErrorMessage } from '@shared/util';

@Component({
  selector: 'app-select',
  imports: [PrimengSelect, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <div class="flex flex-col gap-2">
      <label [for]="formControlName()">{{ label() }}</label>
      <p-select
        [id]="formControlName()"
        [class]="error() ? 'ng-invalid ng-dirty' : ''"
        [options]="list()"
        [optionLabel]="optionLabel()"
        [formControlName]="formControlName()"
        fluid
        [filter]="filter()"
        [filterBy]="filterBy()"
        [resetFilterOnHide]="true"
        appendTo="body"
      />
      @if (error(); as error) {
        <small class="text-red-400">{{ error }}</small>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select implements DoCheck {
  readonly list = input.required<SelectItem[] | undefined>();
  readonly optionLabel = input<string>('name');
  readonly label = input.required<string>();
  readonly formControlName = input.required<string>();
  readonly formControl = input.required<FormControl>();
  readonly filter = input<boolean>(false);
  readonly filterBy = input<string>('name');

  protected readonly error = signal<string | null>(null);

  ngDoCheck(): void {
    const formControl = this.formControl();
    const { invalid, touched, dirty } = formControl;
    this.error.set(invalid && (touched || dirty) ? getErrorMessage(formControl) : null);
  }
}
