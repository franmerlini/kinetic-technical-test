import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-footer',
  imports: [Toolbar],
  template: `
    <p-toolbar styleClass="shadow-md flex w-full justify-center px-6">
      <span>Crafted by Francisco Merlini</span>
    </p-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
