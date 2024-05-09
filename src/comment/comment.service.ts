import { Injectable } from '@nestjs/common';
import { MongoIdDto } from '../shared/dto/MongoId.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { addCommentDto } from './dto/create.comment.dto';
import { VideoService } from 'src/video/video.service';
import {
  CommentNotFound,
  videoNotFound,
} from 'src/video/exceptions/exceptions';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    private readonly videoService: VideoService,

    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async findCommentById(id) {
    return this.commentModel.findById(id);
  }

  async addComment(body: addCommentDto, videoId, userId) {
    await this.addCommentUtil(body, videoId, userId);
    return { statusCode: 201, message: 'Comment successfully added.' };
  }

  async updateComment(body: addCommentDto, commentId, userId) {
    const text = body.text;
    const updatedComment = await this.commentModel.findOneAndUpdate(
      {
        _id: commentId,
        userId: userId,
      },
      {
        $set: { commentBody: text },
      },
      {
        new: true,
      },
    );

    if (!updatedComment) {
      throw new CommentNotFound();
    }

    return { statusCode: 200, message: 'Comment successfully updated' };
  }

  async replyComment(body: addCommentDto, commentId, userId) {
    const comment = await this.findCommentById(commentId);
    if (!comment) throw new CommentNotFound();
    const videoInfo: any = { id: comment.videoId };
    const newComment = await this.addCommentUtil(body, videoInfo, userId);

    await this.commentModel.findOneAndUpdate(
      {
        _id: comment._id,
        userId: userId,
      },
      {
        $push: { replies: newComment._id },
      },
    );

    return { statusCode: 201, message: 'Reply successfully added.' };
  }

  async addCommentUtil(body: addCommentDto, videoId, userId) {
    const video = await this.videoService.findVideoById(videoId);
    if (!video) {
      throw new videoNotFound();
    }

    const text = body.text;
    const comment = await new this.commentModel({
      videoId: videoId,
      userId: userId,
      commentBody: text,
    }).save();

    return comment;
  }

  async getCommentsWithReplies(videoId): Promise<any[]> {
    return this.commentModel
      .aggregate([
        {
          $match: { videoId: videoId },
        },
        {
          $lookup: {
            from: 'comments',
            localField: 'replies',
            foreignField: '_id',
            as: 'replies',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: {
            path: '$userDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            videoId: 1,
            commentBody: 1,
            createdAt: 1,
            updatedAt: 1,
            userId: '$userDetails._id',
            userName: '$userDetails.name',
            replies: {
              $map: {
                input: '$replies',
                as: 'reply',
                in: {
                  _id: '$$reply._id',
                  commentBody: '$$reply.commentBody',
                  createdAt: '$$reply.createdAt',
                  updatedAt: '$$reply.updatedAt',
                  userId: '$$reply.userId',
                  replies: '$$reply.replies',
                },
              },
            },
          },
        },
        {
          $sort: { createdAt: 1 },
        },
      ])
      .exec();
  }
}
