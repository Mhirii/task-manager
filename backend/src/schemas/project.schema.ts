import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Task } from './task.schema';
import mongoose from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Project extends Document {
  @Prop()
  owner: string;

  @Prop()
  title: string;

  @Prop()
  color: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }])
  tasks: string[];

  @Prop()
  dateAdded: Date;

  @Prop()
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
