import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Video {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  url: string;

  @Prop({ required: true, min: 0 })
  duration: number;

  @Prop({
    required: true,
    enum: ['U', 'PG7', 'PG10', 'PG13', 'PG16', 'PG18'],
  })
  ageRestriction: string;

  @Prop({ default: 0, min: 0, max: 5 })
  averageRating?: number;
}

export type videoDocument = HydratedDocument<Video>;
export const videoModel = SchemaFactory.createForClass(Video);
videoModel.index({ ageRestriction: 1 });
