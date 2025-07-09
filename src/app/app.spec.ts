import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [App],
  }).compileComponents();

  const fixture = TestBed.createComponent(App);
  const component = fixture.componentInstance;
  fixture.detectChanges();
  return { fixture, component };
}
