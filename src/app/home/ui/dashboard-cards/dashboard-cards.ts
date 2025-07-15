import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Card } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

import { DashboardData } from '@home/domain';

const ChartColors = [
  { background: 'rgba(255, 99, 132, 0.2)', border: 'rgb(255, 99, 132)' },
  { background: 'rgba(255, 159, 64, 0.2)', border: 'rgb(255, 159, 64)' },
  { background: 'rgba(255, 205, 86, 0.2)', border: 'rgb(255, 205, 86)' },
  { background: 'rgba(75, 192, 192, 0.2)', border: 'rgb(75, 192, 192)' },
  { background: 'rgba(54, 162, 235, 0.2)', border: 'rgb(54, 162, 235)' },
  { background: 'rgba(153, 102, 255, 0.2)', border: 'rgb(153, 102, 255)' },
  { background: 'rgba(201, 203, 207, 0.2)', border: 'rgb(201, 203, 207)' },
] as const;

@Component({
  selector: 'app-dashboard-cards',
  imports: [Card, CurrencyPipe, ChartModule],
  templateUrl: './dashboard-cards.html',
  styleUrl: './dashboard-cards.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCards {
  readonly dashboardData = input.required<DashboardData>();
  readonly stockByProduct = input.required<{ name: string; stock: number }[]>();
  readonly stockValueDistribution = input.required<{ name: string; value: number }[]>();

  protected readonly stockByProductData = computed(() => {
    const stockByProduct = this.stockByProduct();
    return {
      labels: stockByProduct.map(({ name }) => name),
      datasets: [
        {
          label: 'Stock por producto',
          data: stockByProduct.map(({ stock }) => stock),
          backgroundColor: stockByProduct.map((_, index) => ChartColors[index % ChartColors.length].background),
          borderColor: stockByProduct.map((_, index) => ChartColors[index % ChartColors.length].border),
          borderWidth: 1,
        },
      ],
    };
  });
  protected readonly stockByProductOptions = computed(() => ({
    scales: {
      x: { title: { display: true, text: 'Producto' } },
      y: { title: { display: true, text: 'Unidades en stock' } },
    },
  }));
  protected readonly stockValueDistributionData = computed(() => {
    const stockValueDistribution = this.stockValueDistribution();
    return {
      labels: stockValueDistribution.map(({ name }) => name),
      datasets: [
        {
          label: 'Distribución del valor del stock',
          data: stockValueDistribution.map(({ value }) => value),
          backgroundColor: stockValueDistribution.map((_, index) => ChartColors[index % ChartColors.length].background),
          borderColor: stockValueDistribution.map((_, index) => ChartColors[index % ChartColors.length].border),
          borderWidth: 1,
        },
      ],
    };
  });
  protected readonly stockValueDistributionOptions = computed(() => ({}));
}
