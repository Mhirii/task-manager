import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from "mongoose";
import { Task } from './task.schema';

export type TaskDocument = HydratedDocument<Task>;


@Schema()
export class Project extends Document {
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
