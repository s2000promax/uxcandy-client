export interface ITask {
  id?: number;
  username: string;
  email: string;
  text: string;
  status: number;
}

export interface ICreateTasksRequest
  extends Pick<ITask, 'username' | 'email' | 'text'> {}
