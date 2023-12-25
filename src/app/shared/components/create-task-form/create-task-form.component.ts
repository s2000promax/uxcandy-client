import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BaseForm, ICreateTasksRequest, ITask } from '@core/types';
import { EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
import { TaskService } from '@core/services';
import { ResponseStatusEnum } from '@core/enums';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskFormComponent implements OnInit, OnDestroy {
  public taskForm!: FormGroup<BaseForm<ICreateTasksRequest>>;

  public submitted: boolean = false;
  public error: Partial<ITask> = {};

  private destroyed$ = new Subject<void>();

  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(public dialogRef: MatDialogRef<CreateTaskFormComponent>) {}

  ngOnInit() {
    this.taskForm = this.fb.nonNullable.group({
      username: ['', []],
      email: ['', []],
      text: ['', []],
    });
  }

  onSubmit() {
    this.error = {};
    this.submitted = true;

    this.taskService
      .createTask(this.taskForm.getRawValue())
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((response) => {
          this.cdr.markForCheck();
          if (response.status === ResponseStatusEnum.OK) {
            this.onCancel();

            return this.taskService.getTaskList();
          } else {
            this.error = response.message;
            this.submitted = false;

            return EMPTY;
          }
        }),
      )
      .subscribe();
  }

  public onCancel() {
    this.dialogRef.close(this.submitted);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
