import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { RatingModule } from './rating/rating.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.connectionString'),
      }),
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    VideoModule,
    CommentModule,
    RatingModule,
    SharedModule,
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [],
})
export class AppModule {}
