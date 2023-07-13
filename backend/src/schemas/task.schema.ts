import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Project } from './project.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  // @Prop()
  // id: string;

  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;

  @Prop()
  dateAdded: string;

  @Prop()
  due: string;

  @Prop()
  isDone: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
