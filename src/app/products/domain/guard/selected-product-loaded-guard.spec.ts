import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { selectedProductLoadedGuard } from './selected-product-loaded-guard';

describe('selectedProductLoadedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => selectedProductLoadedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
