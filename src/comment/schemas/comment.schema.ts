import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'Video', required: true })
  videoId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  commentBody: string;

  @Prop({ type: [Types.ObjectId], ref: 'Comment' })
  replies: Types.ObjectId[];
}
export type commentDocument = HydratedDocument<Comment>;
export const commentModel = SchemaFactory.createForClass(Comment);
commentModel.index({ videoId: 1, userId: 1 });
