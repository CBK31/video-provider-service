import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUserId } from 'src/shared/decorators/getUserId.decorators';
import { GetUserDob } from 'src/shared/decorators/getUserDob.decorators';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { MongoIdDto, replyCommentDto } from '../shared/dto/MongoId.dto';

import { CommentService } from './comment.service';
import { addCommentDto } from './dto/create.comment.dto';
import { get } from 'http';

@Controller('video-provider')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('addcomment/:id')
  @UseGuards(AuthenticationGuard)
  async addComment(
    @Body() body: addCommentDto,
    @Param() param: MongoIdDto,
    @GetUserId() userId,
  ) {
    return this.commentService.addComment(body, param, userId);
  }

  @Put('updatecomment/:id')
  @UseGuards(AuthenticationGuard)
  async updateComment(
    @Body() body: addCommentDto,
    @Param() param: MongoIdDto,
    @GetUserId() userId,
  ) {
    return this.commentService.updateComment(body, param, userId);
  }

  @Post('replycomment/:id')
  @UseGuards(AuthenticationGuard)
  async replyComment(
    @Body() body: addCommentDto,
    @Param() param: MongoIdDto,
    @GetUserId() userId,
  ) {
    return this.commentService.replyComment(body, param, userId);
  }

  @Get('getallcomments/:id')
  @UseGuards(AuthenticationGuard)
  async getCommentsWithReplies(
    @Param() param: MongoIdDto,
    @GetUserId() userId,
  ) {
    return this.commentService.getCommentsWithReplies(param);
  }
}
