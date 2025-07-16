import { ChangeDetectionStrategy, Component, computed, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  imports: [Toolbar, Button, RouterLink, FormsModule],
  template: `
    <p-toolbar styleClass="shadow-md flex min-h-10 justify-between">
      <div class="flex items-center gap-2">
        <p-button
          icon="pi pi-bars"
          [rounded]="true"
          [text]="true"
          (click)="toggleSidenav.emit()"
          data-testId="menuButton"
        />
        <a routerLink="/" data-testId="appLogo">Mechanic Stock</a>
      </div>
      <div class="flex items-center gap-2">
        <p-button
          [icon]="themeIcon()"
          [rounded]="true"
          [text]="true"
          (click)="isDarkMode.update(updateFn)"
          data-testId="themeButton"
        />
        <a
          icon="pi pi-github"
          href="https://github.com/franmerlini/kinetic-technical-test"
          target="_blank"
          data-testId="githubLink"
        >
          <p-button icon="pi pi-github" [rounded]="true" [text]="true" />
        </a>
      </div>
    </p-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly toggleSidenav = output<void>();

  readonly isDarkMode = model<boolean>();

  protected readonly themeIcon = computed(() => (this.isDarkMode() ? PrimeIcons.SUN : PrimeIcons.MOON));

  readonly updateFn = (currentTheme: boolean) => !currentTheme;
}
