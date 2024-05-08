import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
//import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from 'src/shared/shared.module';
@Module({
  //ConfigModule,
  imports: [SharedModule],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [],
})
export class VideoModule {}
