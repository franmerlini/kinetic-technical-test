import { Injectable, Type, inject } from '@angular/core';

import { DynamicDialogRef, DialogService as PrimengDialogService } from 'primeng/dynamicdialog';

import { Dialog } from '@shared/ui';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly #primengDialogService = inject(PrimengDialogService);

  openWarning(message: string): DynamicDialogRef<Dialog> {
    return this.openDialogComponent('warning', message);
  }

  openError(message: string): DynamicDialogRef<Dialog> {
    return this.openDialogComponent('error', message);
  }

  openSuccess(message: string): DynamicDialogRef<Dialog> {
    return this.openDialogComponent('success', message);
  }

  openInfo(message: string): DynamicDialogRef<Dialog> {
    return this.openDialogComponent('info', message);
  }

  private openDialogComponent(
    type: 'error' | 'warning' | 'success' | 'info',
    message: string
  ): DynamicDialogRef<Dialog> {
    return this.#primengDialogService.open<Dialog, { type: 'error' | 'warning' | 'success' | 'info'; message: string }>(
      Dialog,
      {
        data: { type, message },
        modal: true,
        width: '800px',
        breakpoints: {
          '1280px': '70vw',
          '1024px': '80vw',
          '768px': '85vw',
          '640px': '95vw',
        },
        focusOnShow: false,
      }
    );
  }

  openFromComponent<T, D = unknown>(component: Type<T>, data?: D) {
    return this.#primengDialogService.open(component, {
      data,
      modal: true,
      width: '800px',
      breakpoints: {
        '1280px': '70vw',
        '1024px': '80vw',
        '768px': '85vw',
        '640px': '95vw',
      },
      focusOnShow: false,
    });
  }
}
