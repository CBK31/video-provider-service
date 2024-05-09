import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { Video, videoDocument } from './schemas/video.schema';
import { userRestrected, videoNotFound } from './exceptions/exceptions';
import { GetAllVideosDto } from './dto/video.dto';
import { MongoIdDto } from '../shared/dto/MongoId.dto';
import { calculateUserAge } from 'src/shared/utils/user.age.utils';
import { isAgeRestricted } from 'src/shared/utils/video.restriction.utils';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async findVideoById(id: mongoose.Schema.Types.ObjectId) {
    return this.videoModel.findById(id);
  }

  async updateVideoRating(videoId, rating) {
    return this.videoModel.findOneAndUpdate(
      {
        _id: videoId,
      },
      {
        $set: { averageRating: rating },
      },
    );
  }
  async getVideoUrl(videoId, userDob) {
    const video = await this.findVideoById(videoId);
    if (!video || !video.url) {
      throw new videoNotFound();
    }
    const userAge = await calculateUserAge(userDob);
    const isRestricted = await isAgeRestricted(video.ageRestriction, userAge);
    if (isRestricted) {
      throw new userRestrected();
    }
    return { url: video.url };
  }

  async GetAllAvailableVideos(
    query: GetAllVideosDto,
  ): Promise<videoDocument[]> {
    const pipeline: PipelineStage[] = [];

    if (query.title) {
      pipeline.push({
        $match: {
          title: { $regex: query.title },
        },
      });
    } else {
      pipeline.push({ $match: {} });
    }

    if (query.isSortByRating) {
      pipeline.push({ $sort: { averageRating: -1 } });
    }

    pipeline.push({
      $project: {
        _id: 0,
        __v: 0,
        url: 0,
      },
    });

    return await this.videoModel.aggregate(pipeline).exec();
  }
}
