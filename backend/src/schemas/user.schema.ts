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
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.statics.findById = function (id: string) {
  return this.findOne({ _id: new MongooseSchema.Types.ObjectId(id) });
};