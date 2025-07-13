import { Injectable, inject } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly #messageService = inject(MessageService);

  showSuccess(message: string): void {
    this.#messageService.add({
      severity: 'success',
      detail: message,
      life: 5000,
      closable: false,
    });
  }

  showError(message: string): void {
    this.#messageService.add({
      severity: 'error',
      detail: message,
      life: 5000,
      closable: false,
    });
  }

  showInfo(message: string): void {
    this.#messageService.add({
      severity: 'info',
      detail: message,
      life: 5000,
      closable: false,
    });
  }

  showWarning(message: string): void {
    this.#messageService.add({
      severity: 'warn',
      detail: message,
      life: 5000,
      closable: false,
    });
  }
}
