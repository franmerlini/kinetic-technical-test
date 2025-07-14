import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

const TYPE_ICONS = {
  error: PrimeIcons.EXCLAMATION_CIRCLE,
  warning: PrimeIcons.EXCLAMATION_TRIANGLE,
  success: PrimeIcons.CHECK_CIRCLE,
  info: PrimeIcons.INFO_CIRCLE,
} as const;

const TYPE_COLORS = {
  error: 'text-red-500',
  warning: 'text-yellow-500',
  success: 'text-green-500',
  info: 'text-blue-500',
} as const;

type Data = { type: 'error' | 'warning' | 'success' | 'info'; message: string };

@Component({
  selector: 'app-dialog',
  imports: [Button],
  template: `
    <div class="flex flex-col justify-center gap-8">
      <p class="text-center"><i [class]="getIconClasses()"></i></p>

      <p class="text-center">{{ config.data?.message }}</p>

      <div class="flex justify-center gap-2">
        @if (config.data?.type !== 'info') {
          <p-button severity="secondary" (click)="ref.close(false)">Cancelar</p-button>
        }
        <p-button (click)="ref.close(true)">Aceptar</p-button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  protected readonly ref = inject(DynamicDialogRef<Dialog>);
  protected readonly config = inject(DynamicDialogConfig) as DynamicDialogConfig<Data>;

  getIconClasses(): string {
    return `${TYPE_ICONS[this.config.data?.type ?? 'success']} text-6xl ${TYPE_COLORS[this.config.data?.type ?? 'success']}`;
  }
}
