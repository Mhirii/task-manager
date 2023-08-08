import { Document } from 'mongoose';
import { Task } from '../schemas/task.schema';

export interface IProject extends Document {
  id: string;
  title: string;
  color: string;
  tasks?: Task[];
  dateAdded: string;
  updatedAt: string;
}
