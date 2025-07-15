import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuItem, PrimeIcons } from 'primeng/api';

import { Footer, Header, Sidenav } from '@core/ui';

@Component({
  selector: 'app-layout',
  imports: [Sidenav, Header, RouterOutlet, Footer],
  template: `
    <div class="bg-surface-50 dark:bg-surface-950 flex min-h-screen flex-col">
      <app-sidenav [(visible)]="visible" [items]="items()" />

      <app-header (toggleSidenav)="toggleSidenav()" (isDarkModeChange)="toggleDarkMode()" />

      <main class="mx-auto w-full max-w-[1200px] flex-grow px-3 py-6">
        <router-outlet />
      </main>

      <app-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  readonly visible = signal(false);
  readonly items = signal<MenuItem[]>([
    { label: 'Inicio', icon: PrimeIcons.HOME, routerLink: '/' },
    { label: 'Gestión de productos', icon: PrimeIcons.BOX, routerLink: '/products' },
  ]);

  toggleSidenav(): void {
    this.visible.update((v) => !v);
  }

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    element.classList.toggle('dark');
  }
}
