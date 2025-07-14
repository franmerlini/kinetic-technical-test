import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DashboardDataClient } from '@home/data-access';
import { DashboardCards } from '@home/ui';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCards],
  template: `
    <div class="flex flex-col gap-8">
      <h1 class="text-center">Mechanic Stock Dashboard</h1>

      <app-dashboard-cards [dashboardData]="dashboardData()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  readonly #dashboardDataClient = inject(DashboardDataClient);

  protected readonly dashboardData = toSignal(this.#dashboardDataClient.getDashboardData());
}
