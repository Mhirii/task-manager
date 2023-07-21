import { IProject } from './project.interface';
import { Document, ObjectId } from 'mongoose';
export interface ITask extends Document {
  // id: string;
  readonly title: string;
  readonly desc: string;
  readonly project_id?: ObjectId;
  readonly subtasks?: {
    title: string;
    order: number;
  }[];
  readonly dateAdded: Date;
  readonly Due: Date;
  readonly isDone: boolean;
}
