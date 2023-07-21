import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Task extends mongoose.Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  desc: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project_id: string;

  @Prop()
  subtasks: {
    title: string;
    order: number;
  }[];

  @Prop()
  dateAdded: Date;

  @Prop()
  due: Date;

  @Prop()
  isDone: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
