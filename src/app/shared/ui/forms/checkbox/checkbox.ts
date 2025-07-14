import { ChangeDetectionStrategy, Component, DoCheck, inject, input, signal } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Checkbox as PrimengCheckbox } from 'primeng/checkbox';

import { getErrorMessage } from '@shared/util';

@Component({
  selector: 'app-checkbox',
  imports: [PrimengCheckbox, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <div class="flex flex-col gap-2">
      <label [for]="formControlName()">{{ label() }}</label>
      <div class="flex items-center gap-2">
        <p-checkbox
          [id]="formControlName()"
          [class]="error() ? 'ng-invalid ng-dirty' : ''"
          [formControlName]="formControlName()"
          [formControl]="formControl()"
          [binary]="true"
        />
        <label [for]="formControlName()">{{ checkboxLabel() }}</label>
      </div>
      @if (error(); as error) {
        <small class="text-red-400">{{ error }}</small>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox implements DoCheck {
  readonly label = input<string>();
  readonly checkboxLabel = input<string>();
  readonly formControlName = input.required<string>();
  readonly formControl = input.required<FormControl>();

  protected readonly error = signal<string | null>(null);

  ngDoCheck(): void {
    const formControl = this.formControl();
    const { invalid, touched, dirty } = formControl;
    this.error.set(invalid && (touched || dirty) ? getErrorMessage(formControl) : null);
  }
}
