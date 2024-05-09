import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from 'src/video/video.module';
import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Rating, ratingModel } from './schemas/rating.schema';

@Module({
  imports: [
    SharedModule,
    VideoModule,
    MongooseModule.forFeature([{ name: Rating.name, schema: ratingModel }]),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
