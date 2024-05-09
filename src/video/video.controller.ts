import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { GetUserId } from 'src/shared/decorators/getUserId.decorators';
import { GetUserDob } from 'src/shared/decorators/getUserDob.decorators';
import { GetAllVideosDto } from './dto/video.dto';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { MongoIdDto } from '../shared/dto/MongoId.dto';

@Controller('video-provider')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('available')
  async GetAllAvailableVideos(@Query() query: GetAllVideosDto) {
    return await this.videoService.GetAllAvailableVideos(query);
  }

  @UseGuards(AuthenticationGuard)
  @Get('play/:id')
  async getVideoUrl(@Param() param: MongoIdDto, @GetUserDob() userDob) {
    return await this.videoService.getVideoUrl(param, userDob);
  }
}
