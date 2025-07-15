import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';
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
  readonly img = viewChild<ElementRef<HTMLImageElement>>('img');

  readonly product = input.required<Product>();

  readonly deleteProduct = output<number>();

  setPlaceholderImage(): void {
    this.img()?.nativeElement.setAttribute(
      'src',
      'https://imgs.search.brave.com/4l4fU8BEQaCZG5y951ub0b6BzVolar0kLd8hvcSdNSo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vMTc4Mjgy/NzgvMzMxNTAvdi80/NTAvZGVwb3NpdHBo/b3Rvc18zMzE1MDMy/NjItc3RvY2staWxs/dXN0cmF0aW9uLW5v/LWltYWdlLXZlY3Rv/ci1zeW1ib2wtbWlz/c2luZy5qcGc'
    );
  }
}
