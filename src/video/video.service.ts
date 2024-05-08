import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { Video, videoDocument } from './schemas/video.schema';
import { videoNotFound } from './exceptions/exceptions';
import { GetAllVideosDto } from './dto/video.dto';
import { MongoIdDto } from '../shared/dto/MongoId.dto';
// type VideoField =
//   | '_id'
//   | 'title'
//   | 'description'
//   | 'url'
//   | 'duration'
//   | 'ageRestriction'
//   | 'averageRating';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  //   async findAllVideosWithoutOneField(field: VideoField) {
  //     const projection = { [field]: 0 };
  //     return await this.videoModel
  //       .aggregate([
  //         {
  //           $project: projection,
  //         },
  //       ])
  //       .exec();
  //   }

  //   async getAllAvailableVideos() {
  //     return this.findAllVideosWithoutOneField('url');
  //   }

  async findVideoById(id: mongoose.Schema.Types.ObjectId) {
    return this.videoModel.findById(id);
  }

  async getVideoUrl(param: MongoIdDto) {
    // console.log('3am bousal 3al conroller :' + videoId);
    const videoUrl = (await this.findVideoById(param.id)).url;
    if (!videoUrl) {
      throw new videoNotFound();
    }
    return videoUrl;
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
