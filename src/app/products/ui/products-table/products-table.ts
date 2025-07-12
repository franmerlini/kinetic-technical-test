import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';

import { Product } from '@products/domain';

@Component({
  selector: 'app-products-table',
  imports: [TableModule, Button, Tooltip],
  templateUrl: './products-table.html',
  styleUrl: './products-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTable {
  readonly products = input.required<Product[]>();
  readonly columns = input.required<string[]>();

  readonly viewProduct = output<number>();
  readonly updateProduct = output<number>();
  readonly deleteProduct = output<number>();
}
