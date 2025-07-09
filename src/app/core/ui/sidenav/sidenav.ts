import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { PanelMenu } from 'primeng/panelmenu';
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
  selector: 'app-sidenav',
  imports: [Drawer, ScrollPanel, PanelMenu],
  template: `
    <p-drawer [(visible)]="visible">
      <ng-template #headless>
        <p-scrollpanel styleClass="p-4">
          <p-panel-menu [model]="items()" data-testId="panelMenu" />
        </p-scrollpanel>
      </ng-template>
    </p-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidenav {
  readonly visible = model.required<boolean>();
  readonly items = input.required<MenuItem[]>();
}
