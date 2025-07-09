import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterLink, provideRouter } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';

import { Header } from './header';

describe('Header', () => {
  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should emit toggleSidenav event when sidenav button is clicked', () => {
    const { fixture, component } = setup();
    const button = fixture.debugElement.query(By.css('[data-testId="menuButton"]'));
    jest.spyOn(component.toggleSidenav, 'emit');

    button.triggerEventHandler('click', null);
    expect(component.toggleSidenav.emit).toHaveBeenCalled();
  });

  it('should have correct routerLink for app logo', () => {
    const { fixture } = setup();
    const anchor = fixture.debugElement.query(By.css('[data-testId="appLogo"]'));
    const routerLink = anchor.injector.get(RouterLink);
    expect(routerLink.href).toBe('/');
  });

  it('should toggle isDarkMode when theme button is clicked', () => {
    const { fixture, component } = setup();
    const button = fixture.debugElement.query(By.css('[data-testId="themeButton"]'));

    component.isDarkMode.set(false);
    fixture.detectChanges();

    button.triggerEventHandler('click', null);
    expect(component.isDarkMode()).toBe(true);

    button.triggerEventHandler('click', null);
    expect(component.isDarkMode()).toBe(false);
  });

  it('should compute correct themeIcon based on isDarkMode', () => {
    const { fixture, component } = setup();
    const themeButton = fixture.debugElement.query(By.css('[data-testId="themeButton"]'));

    component.isDarkMode.set(false);
    fixture.detectChanges();
    expect(themeButton.componentInstance.icon).toBe(PrimeIcons.MOON);

    component.isDarkMode.set(true);
    fixture.detectChanges();
    expect(themeButton.componentInstance.icon).toBe(PrimeIcons.SUN);
  });

  it('should update isDarkMode using updateFn', () => {
    const { fixture, component } = setup();
    component.isDarkMode.set(false);
    fixture.detectChanges();

    component.isDarkMode.update(component.updateFn);
    expect(component.isDarkMode()).toBe(true);

    component.isDarkMode.update(component.updateFn);
    expect(component.isDarkMode()).toBe(false);
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [Header, Toolbar, Button, FormsModule],
    providers: [provideRouter([])],
  }).compileComponents();

  const fixture = TestBed.createComponent(Header);
  const component = fixture.componentInstance;
  fixture.detectChanges();
  return { fixture, component };
}
