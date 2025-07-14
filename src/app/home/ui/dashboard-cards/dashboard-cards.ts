import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Card } from 'primeng/card';

import { DashboardData } from '@home/domain';

@Component({
  selector: 'app-dashboard-cards',
  imports: [Card, CurrencyPipe],
  templateUrl: './dashboard-cards.html',
  styleUrl: './dashboard-cards.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCards {
  readonly dashboardData = input.required<DashboardData>();
}
