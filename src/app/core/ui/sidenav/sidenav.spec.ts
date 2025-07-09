import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { Sidenav } from './sidenav';

const testVisible = true;
const testItems: MenuItem[] = [
  { label: 'Item 1', icon: 'icon 1', routerLink: '/item1' },
  { label: 'Item 2', icon: 'icon 2', routerLink: '/item2' },
];

describe('Sidenav', () => {
  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should have visible set to true', () => {
    const { component } = setup();
    expect(component.visible()).toBe(testVisible);
  });

  it('should have items set correctly', () => {
    const { component } = setup();
    expect(component.items()).toEqual(testItems);
  });

  it('should render the correct number of menu items', () => {
    const { panelMenu } = setup();
    expect(panelMenu.children.length).toBe(testItems.length);
  });

  it('should render a link for each menu item', () => {
    const { panelMenu } = setup();
    panelMenu.children.forEach((item) => {
      const a = item.query(By.css('.p-panelmenu-header-link'));
      expect(a).toBeTruthy();
    });
  });

  it('should render an icon for each menu item', () => {
    const { panelMenu } = setup();
    panelMenu.children.forEach((item) => {
      const icon = item.query(By.css('.p-panelmenu-header-icon'));
      expect(icon).toBeTruthy();
    });
  });

  it('should render a label for each menu item', () => {
    const { panelMenu } = setup();
    panelMenu.children.forEach((item) => {
      const label = item.query(By.css('.p-panelmenu-header-label'));
      expect(label).toBeTruthy();
    });
  });

  it('should set the correct href for each menu item', () => {
    const { panelMenu } = setup();
    panelMenu.children.forEach((item, i) => {
      const a = item.query(By.css('.p-panelmenu-header-link'));
      expect(a.nativeElement.getAttribute('href')).toBe(testItems[i].routerLink);
    });
  });
  it('should set the correct icon class for each menu item', () => {
    const { panelMenu } = setup();
    panelMenu.children.forEach((item, i) => {
      const icon = item.query(By.css('.p-panelmenu-header-icon'));
      expect(Object.values(icon.nativeElement.classList)).toContain(testItems[i].icon.split(' ')[0]);
    });
  });

  it('should set the correct label text for each menu item', () => {
    const { panelMenu } = setup();
    panelMenu.children.forEach((item, i) => {
      const label = item.query(By.css('.p-panelmenu-header-label'));
      expect(label.nativeElement.textContent).toContain(testItems[i].label);
    });
  });

  it('should handle empty items array', () => {
    const { ref, fixture } = setup();
    ref.setInput('items', []);
    fixture.detectChanges();
    const panelMenu = fixture.debugElement.query(By.css('[data-testId="panelMenu"]'));
    expect(panelMenu.children.length).toBe(0);
  });

  it('should toggle visibility', () => {
    const { component, fixture } = setup();
    component.visible.set(false);
    fixture.detectChanges();
    expect(component.visible()).toBe(false);
    component.visible.set(true);
    fixture.detectChanges();
    expect(component.visible()).toBe(true);
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [Sidenav],
    providers: [provideRouter([]), provideAnimationsAsync()],
  }).compileComponents();

  const fixture = TestBed.createComponent(Sidenav);
  const component = fixture.componentInstance;
  const ref = fixture.componentRef;
  ref.setInput('visible', testVisible);
  ref.setInput('items', testItems);
  fixture.detectChanges();
  const panelMenu = fixture.debugElement.query(By.css('[data-testId="panelMenu"]'));
  return { fixture, component, ref, panelMenu };
}
