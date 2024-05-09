import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { VideoService } from 'src/video/video.service';
import { Rating } from './schemas/rating.schema';
import { videoNotFound } from 'src/video/exceptions/exceptions';

@Injectable()
export class RatingService {
  constructor(
    private readonly videoService: VideoService,

    @InjectModel(Rating.name) private ratingModel: Model<Rating>,
  ) {}

  async addRating(rating, videoId, userId) {
    console.log(
      JSON.stringify(rating) + '  ' + JSON.stringify(videoId) + '  ' + userId,
    );
    const video = await this.videoService.findVideoById(videoId);

    if (!video) throw new videoNotFound();

    const comment = await new this.ratingModel({
      videoId: videoId,
      userId: userId,
      rating: rating,
    }).save();

    return video;
  }
}
