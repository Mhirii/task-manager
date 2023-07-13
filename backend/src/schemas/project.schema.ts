import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Task } from './task.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop()
  color: string;

  @Prop([String])
  tasks: Task[];

  @Prop()
  dateAdded: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
