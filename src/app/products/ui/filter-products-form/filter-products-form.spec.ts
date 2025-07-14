import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductsForm } from './filter-products-form';

describe('FilterProductsForm', () => {
  let component: FilterProductsForm;
  let fixture: ComponentFixture<FilterProductsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterProductsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterProductsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
