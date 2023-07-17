import { ITask } from './task.interface';
import { Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  title: string;
  desc?: string;
  color: string;
  tasks?: ITask[];
  dateAdded: string;
}
