import { Project } from './project.interface';

export interface Task {
  // id: string;
  title: string;
  desc: string;
  project?: Project;
  dateAdded: string;
  tasks: string;
}
