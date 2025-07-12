import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tooltip } from 'primeng/tooltip';

import { Product } from '@products/domain';

@Component({
  selector: 'app-product-card',
  imports: [Card, RouterLink, CurrencyPipe, Button, Tooltip],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  readonly product = input.required<Product>();

  readonly updateProduct = output<number>();
  readonly deleteProduct = output<number>();
}
