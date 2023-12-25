import { ResponseStatusEnum } from '@core/enums';
import { ITask } from '@core/types/task.interface';

export interface IResponse {
  status: ResponseStatusEnum;
  message: {
    id?: number;
    username?: string;
    password?: string;
    token?: string;
    email?: string;
    text?: string;
    status?: number;
    tasks?: ITask[];
    total_task_count?: string;
  };
}
