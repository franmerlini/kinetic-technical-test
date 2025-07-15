import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { productsLoadedGuard } from './products-loaded-guard';

describe('productsLoadedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => productsLoadedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
