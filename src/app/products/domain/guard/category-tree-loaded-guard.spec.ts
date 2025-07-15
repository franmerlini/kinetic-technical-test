import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { categoryTreeLoadedGuard } from './category-tree-loaded-guard';

describe('categoryTreeLoadedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => categoryTreeLoadedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
