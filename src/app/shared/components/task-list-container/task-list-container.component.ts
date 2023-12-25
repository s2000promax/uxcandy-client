import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersService, TaskService } from '@core/services';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskCardComponent } from '@shared/components/task-card/task-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FiltersContainerComponent } from '@shared/components/filters-container/filters-container.component';
import { ITask } from '@core/types';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskFormComponent } from '@shared/components/create-task-form/create-task-form.component';
import { EditTaskFormComponent } from '@shared/components/edit-task-form/edit-task-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    TaskCardComponent,
    MatPaginatorModule,
    FiltersContainerComponent,
  ],
  templateUrl: './task-list-container.component.html',
  styleUrls: ['./task-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListContainerComponent implements OnDestroy {
  public readonly taskService = inject(TaskService);
  public readonly filtersService = inject(FiltersService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  private durationInSeconds = 3;

  public onPageChange(event: PageEvent) {
    this.filtersService.currentPageSubject.next(event.pageIndex + 1);
  }

  public onCreateTask() {
    const dialogRef = this.dialog.open(CreateTaskFormComponent, {
      width: '350px',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.openSnackBar('Задача успешно создана!');
        }
      });
  }

  public onEditTask(task: ITask) {
    const dialogRef = this.dialog.open(EditTaskFormComponent, {
      width: '350px',
      data: task,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.openSnackBar('Задача успешно отредактирована!');
        }
      });
  }

  public openSnackBar(message: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message,
      },
    });
  }

  ngOnDestroy() {
    this.taskService.destroySubscription();
  }
}
