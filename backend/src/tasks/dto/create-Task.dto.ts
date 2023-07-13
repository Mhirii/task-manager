import { Project } from '../../schemas/project.schema';

export class CreateTaskDto {
  title: string;
  desc: string;
  project: Project;
  dateAdded: string;
  due: string;
  isDone: boolean;
}
