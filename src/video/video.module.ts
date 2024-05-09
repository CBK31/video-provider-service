import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { SharedModule } from 'src/shared/shared.module';
import { videoNotFound } from './exceptions/exceptions';
@Module({
  imports: [SharedModule],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
