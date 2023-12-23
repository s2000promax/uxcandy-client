import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-list',
    pathMatch: 'full',
  },
  {
    path: 'task-list',
    loadChildren: () =>
      import('./pages/task-dashboard-page/task-dashboard-page.module').then(
        (m) => m.TaskDashboardPageModule,
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
