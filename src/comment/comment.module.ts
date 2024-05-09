import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from 'src/video/video.module';
import { Comment, commentModel } from './schemas/comment.schema';
@Module({
  imports: [
    SharedModule,
    VideoModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: commentModel }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
