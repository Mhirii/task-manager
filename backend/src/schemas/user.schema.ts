import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends mongoose.Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  HashedRefreshToken: string;

  @Prop()
  dateJoined: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }])
  tasksInProgress: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }])
  tasksDone: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
