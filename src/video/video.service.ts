import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Video, videoDocument, videoModel } from './schemas/video.schema';
import {} from './exceptions/exceptions';
import { GetAllVideosDto } from './dto/video.dto';

type VideoField =
  | '_id'
  | 'title'
  | 'description'
  | 'url'
  | 'duration'
  | 'ageRestriction'
  | 'averageRating';

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
        title: 1,
        description: 1,
        duration: 1,
        ageRestriction: 1,
        averageRating: 1,
      },
    });

    return await this.videoModel.aggregate(pipeline).exec();
  }
}
