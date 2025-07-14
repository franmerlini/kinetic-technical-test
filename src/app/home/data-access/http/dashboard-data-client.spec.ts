import { TestBed } from '@angular/core/testing';

import { DashboardDataClient } from './dashboard-data-client';

describe('DashboardDataClient', () => {
  let service: DashboardDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
