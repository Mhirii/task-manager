import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Task extends mongoose.Document {
  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project_id: string;

  @Prop()
  subtasks: {
    subtask_id: string;
    title: string;
    color: string;
  }[];

  @Prop()
  dateAdded: Date;

  @Prop()
  due: Date;

  @Prop()
  isDone: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
