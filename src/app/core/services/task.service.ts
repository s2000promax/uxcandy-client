import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import {
  BehaviorSubject,
  combineLatest,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ICreateTasksRequest, ITask } from '@core/types';
import { ResponseStatusEnum } from '@core/enums';
import { FiltersService } from '@core/services/filters.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiService = inject(ApiService);
  private readonly filtersService = inject(FiltersService);

  private taskListSubject = new BehaviorSubject<ITask[]>([]);
  public taskList$ = this.taskListSubject.asObservable();

  private subscription: Subscription;

  constructor() {
    this.subscription = combineLatest([
      this.filtersService.currentPage$,
      this.filtersService.sortField$,
      this.filtersService.sortDirection$,
    ])
      .pipe(switchMap(() => this.getTaskList()))
      .subscribe();
  }

  public getTaskList() {
    return this.apiService.fetchTaskList().pipe(
      tap((response) => {
        if (
          response.status === ResponseStatusEnum.OK &&
          response.message?.tasks &&
          response.message?.total_task_count
        ) {
          this.taskListSubject.next(response.message.tasks);
          this.filtersService.totalTasksCountSubject.next(
            Number(response.message.total_task_count),
          );
        }
      }),
    );
  }

  public createTask(task: ICreateTasksRequest) {
    return this.apiService.createTask(task);
  }

  public editTask(task: ITask) {
    return this.apiService.editTask(task);
  }

  public destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
