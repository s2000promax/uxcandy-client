import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskDashboardPageComponent } from './task-dashboard-page.component';
import { TaskDashboardPageRoutingModule } from './task-dashboard-page-routing.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { TaskListContainerComponent } from '@shared/components/task-list-container/task-list-container.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [TaskDashboardPageComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    TaskDashboardPageRoutingModule,
    ToolbarComponent,
    TaskListContainerComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class TaskDashboardPageModule {}
