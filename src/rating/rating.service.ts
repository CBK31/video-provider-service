import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const video = await this.videoService.findVideoById(videoId);

    if (!video) throw new videoNotFound();

    const comment = await new this.ratingModel({
      videoId: videoId,
      userId: userId,
      rating: rating,
    }).save();

    const average = await this.ratingModel.aggregate([
      {
        $match: {
          videoId: videoId,
        },
      },
      {
        $group: {
          _id: '$videoId',
          averageRating: {
            $avg: '$rating',
          },
        },
      },
      {
        $project: {
          _id: 0,
          averageRating: {
            $round: ['$averageRating', 1],
          },
        },
      },
    ]);

    const newAverage = JSON.stringify(average[0]['averageRating']);

    const oo = await this.videoService.updateVideoRating(videoId, newAverage);

    return { statusCode: 200, message: 'Rating successfully added' };
  }
}
