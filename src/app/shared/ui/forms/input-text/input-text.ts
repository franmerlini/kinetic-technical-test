import { ChangeDetectionStrategy, Component, DoCheck, inject, input, signal } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputText as PrimengInputText } from 'primeng/inputtext';

import { getErrorMessage } from '@shared/util';

@Component({
  selector: 'app-input-text',
  imports: [PrimengInputText, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <div class="flex flex-col gap-2">
      <label [for]="formControlName()">{{ label() }} </label>
      <input
        [id]="formControlName()"
        pInputText
        [class]="error() ? 'ng-invalid ng-dirty' : ''"
        [formControlName]="formControlName()"
        [formControl]="formControl()"
        fluid
        autocomplete="off"
      />
      @if (error(); as error) {
        <small class="text-red-400">{{ error }}</small>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputText implements DoCheck {
  readonly label = input.required<string>();
  readonly formControlName = input.required<string>();
  readonly formControl = input.required<FormControl>();

  protected readonly error = signal<string | null>(null);

  ngDoCheck(): void {
    const formControl = this.formControl();
    const { invalid, touched, dirty } = formControl;
    this.error.set(invalid && (touched || dirty) ? getErrorMessage(formControl) : null);
  }
}
