import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import {
  ICreateTasksRequest,
  ILoginRequest,
  IResponse,
  ITask,
} from '@core/types';
import { PersistenceService } from '@core/services/persistence.service';
import { LocalStorageEnum } from '@core/enums';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly persistenceService = inject(PersistenceService);

  public login(data: ILoginRequest) {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    return this.http.post<IResponse>(environment.apiUrl + '/login', formData);
  }

  public fetchTaskList() {
    return this.http.get<IResponse>(environment.apiUrl + '/');
  }

  public createTask(data: ICreateTasksRequest) {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('text', data.text);

    return this.http.post<IResponse>(environment.apiUrl + '/create', formData);
  }

  public editTask(task: ITask) {
    const token = this.persistenceService.get(LocalStorageEnum.TOKEN);

    const formData = new FormData();
    formData.append('username', task.username);
    formData.append('email', task.email);
    formData.append('text', task.text);
    formData.append('status', String(task.status));
    formData.append('token', token);

    return this.http.post<IResponse>(
      environment.apiUrl + `/edit/${task.id}`,
      formData,
    );
  }
}
