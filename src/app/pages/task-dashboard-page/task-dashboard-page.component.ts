import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-dashboard-page',
  templateUrl: './task-dashboard-page.component.html',
  styleUrls: ['./task-dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDashboardPageComponent {}
