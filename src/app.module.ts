import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { RatingModule } from './rating/rating.module';

import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    VideoModule,
    CommentModule,
    RatingModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
