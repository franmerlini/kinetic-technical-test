import { ChangeDetectionStrategy, Component, DoCheck, inject, input, signal } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Textarea as PrimengTextarea } from 'primeng/textarea';

import { getErrorMessage } from '@shared/util';

@Component({
  selector: 'app-textarea',
  imports: [PrimengTextarea, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <div class="flex flex-col gap-2">
      <label [for]="formControlName()">{{ label() }}</label>
      <textarea
        [id]="formControlName()"
        pTextarea
        [rows]="rows()"
        class="w-full"
        [class]="error() ? 'border-error' : ''"
        [formControlName]="formControlName()"
        [formControl]="formControl()"
        autocomplete="off"
      ></textarea>
      @if (error(); as error) {
        <small class="text-red-400">{{ error }}</small>
      } @else if (helpText()) {
        <small>{{ helpText() }}</small>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Textarea implements DoCheck {
  readonly label = input.required<string>();
  readonly formControlName = input.required<string>();
  readonly formControl = input.required<FormControl>();
  readonly helpText = input<string>('');
  readonly rows = input<number>(5);

  protected readonly error = signal<string | null>(null);

  ngDoCheck(): void {
    const formControl = this.formControl();
    const { invalid, touched, dirty } = formControl;
    this.error.set(invalid && (touched || dirty) ? getErrorMessage(formControl) : null);
  }
}
