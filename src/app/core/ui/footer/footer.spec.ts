import { TestBed } from '@angular/core/testing';

import { Footer } from './footer';

describe('Footer', () => {
  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [Footer],
  }).compileComponents();

  const fixture = TestBed.createComponent(Footer);
  const component = fixture.componentInstance;
  fixture.detectChanges();
  return { fixture, component };
}
