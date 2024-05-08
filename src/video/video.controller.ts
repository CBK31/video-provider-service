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
import { GetAllVideosDto, VideoIdDto } from './dto/video.dto';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // @HttpCode(HttpStatus.CREATED)

  // @Get('available')
  // async GetAllAvailableVideos(
  //   @Query('searchTerm') searchTerm?: string,
  //   @Query('sortByRating') sortByRating?: boolean,
  // ) {
  //   try {
  //     // return await this.videoService.findAvailableVideos(
  //     //   searchTerm,
  //     //   sortByRating === true,
  //     // );
  //   } catch (error) {
  //     //throw new BadRequestException(error.message);
  //   }
  // }

  @Get('available')
  async GetAllAvailableVideos(@Query() query: GetAllVideosDto) {
    try {
      return await this.videoService.GetAllAvailableVideos(query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
