import { Task } from './task.interface';

export interface Project {
  id: string;
  title: string;
  desc: string;
  tasks: Task[];
  dateAdded: string;
  due: string;
  isDone: boolean;
}
