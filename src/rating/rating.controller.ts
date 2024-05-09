import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { VideoService } from 'src/video/video.service';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { GetUserId } from 'src/shared/decorators/getUserId.decorators';
import { ObjectId } from 'mongoose';

@Controller('video-provider')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post('addrating/:id')
  @UseGuards(AuthenticationGuard)
  async addRating(
    @Body() body: any,
    @Param('id') videoId: ObjectId,
    @GetUserId() userId,
  ) {
    return this.ratingService.addRating(body.rating, videoId, userId);
  }
}
