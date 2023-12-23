import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDashboardPageComponent } from './task-dashboard-page.component';
import { TaskDashboardPageRoutingModule } from './task-dashboard-page-routing.module';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@NgModule({
  declarations: [TaskDashboardPageComponent],
  imports: [CommonModule, TaskDashboardPageRoutingModule, NavbarComponent],
})
export class TaskDashboardPageModule {}
