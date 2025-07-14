import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductsDialog } from './filter-products-dialog';

describe('FilterProductsDialog', () => {
  let component: FilterProductsDialog;
  let fixture: ComponentFixture<FilterProductsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterProductsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterProductsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
