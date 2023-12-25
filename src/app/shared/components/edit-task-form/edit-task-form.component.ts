import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BaseForm, IResponse, ITask } from '@core/types';
import { EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
import { TaskService } from '@core/services';
import { ResponseStatusEnum } from '@core/enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { statusConverter } from '@core/helpers';
import { statusChecker } from '@core/helpers/statusChecker';

export interface ITaskEditForm
  extends Pick<ITask, 'username' | 'email' | 'text'> {
  status: boolean;
}

@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskFormComponent implements OnInit, OnDestroy {
  public taskForm!: FormGroup<BaseForm<ITaskEditForm>>;

  public submitted: boolean = false;
  public error: Partial<IResponse> = {};

  private destroyed$ = new Subject<void>();

  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ITask,
    public dialogRef: MatDialogRef<EditTaskFormComponent>,
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.nonNullable.group({
      username: [this.data.username, []],
      email: [this.data.email, []],
      text: [this.data.text, []],
      status: [statusConverter(this.data.status), []],
    });
  }

  onSubmit() {
    this.error = {};
    this.submitted = true;

    const newTask: ITask = {
      id: this.data.id,
      username: this.taskForm.value.username!,
      email: this.taskForm.value.email!,
      text: this.taskForm.value.text!,
      status: statusChecker(
        this.data.text,
        this.taskForm.value.text!,
        this.data.status,
        this.taskForm.value.status!,
      ),
    };

    this.taskService
      .editTask(newTask)
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((response) => {
          this.cdr.markForCheck();
          if (response.status === ResponseStatusEnum.OK) {
            this.onCancel();

            return this.taskService.getTaskList();
          } else {
            this.error = response;
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
