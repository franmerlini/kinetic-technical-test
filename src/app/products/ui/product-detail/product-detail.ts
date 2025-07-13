import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';

import { CommaSeparatedPipe } from '@shared/pipe';

import { Product } from '@products/domain';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, CommaSeparatedPipe, Divider, Button, RouterLink, DatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  readonly product = input.required<Product>();

  readonly deleteProduct = output<number>();
}
