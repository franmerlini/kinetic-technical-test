import { TestBed } from '@angular/core/testing';

import { CategoryDataClient } from './category-data-client';

describe('CategoryDataClient', () => {
  let service: CategoryDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
