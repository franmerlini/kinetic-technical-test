import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Toast } from 'primeng/toast';

@Component({
  imports: [Toast, RouterOutlet],
  selector: 'app-root',
  template: `
    <p-toast position="top-right" />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
