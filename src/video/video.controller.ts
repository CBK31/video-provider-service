import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { GetUserId } from 'src/shared/decorators/getUserId.decorators';
import { GetUserDob } from 'src/shared/decorators/getUserDob.decorators';
import { GetAllVideosDto } from './dto/video.dto';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { videoNotFound } from './exceptions/exceptions';
import { MongoIdDto } from '../shared/dto/MongoId.dto';
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('available')
  async GetAllAvailableVideos(@Query() query: GetAllVideosDto) {
    return await this.videoService.GetAllAvailableVideos(query);
  }

  @Get('play/:id')
  async getVideoUrl(@Param() param: MongoIdDto) {
    return await this.videoService.getVideoUrl(param);
  }
}
