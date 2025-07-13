import { TestBed } from '@angular/core/testing';

import { ProductDataClient } from './product-data-client';

describe('ProductDataClient', () => {
  let service: ProductDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
