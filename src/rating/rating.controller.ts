import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { GetUserId } from 'src/shared/decorators/getUserId.decorators';
import { ObjectId } from 'mongoose';
import { MongoIdDto, RatingDto } from './dto/rating.dto';

@Controller('video-provider')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post('addrating/:id')
  @UseGuards(AuthenticationGuard)
  async addRating(
    @Body() { rating }: RatingDto,
    @Param() { id }: MongoIdDto,
    @GetUserId() userId,
  ) {
    return this.ratingService.addRating(rating, id, userId);
  }
}
