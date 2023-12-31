import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
