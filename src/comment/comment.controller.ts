import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUserId } from 'src/shared/decorators/getUserId.decorators';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { MongoIdDto } from '../shared/dto/MongoId.dto';

import { CommentService } from './comment.service';
import { addCommentDto } from './dto/create.comment.dto';

@Controller('video-provider')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('addcomment/:id')
  @UseGuards(AuthenticationGuard)
  async addComment(
    @Body() body: addCommentDto,
    @Param() { id }: MongoIdDto,
    @GetUserId() userId,
  ) {
    return this.commentService.addComment(body, id, userId);
  }

  @Put('updatecomment/:id')
  @UseGuards(AuthenticationGuard)
  async updateComment(
    @Body() body: addCommentDto,
    @Param() { id }: MongoIdDto,
    @GetUserId() userId,
  ) {
    return this.commentService.updateComment(body, id, userId);
  }

  @Post('replycomment/:id')
  @UseGuards(AuthenticationGuard)
  async replyComment(
    @Body() body: addCommentDto,
    @Param() { id }: MongoIdDto,
    @GetUserId() userId,
  ) {
    return this.commentService.replyComment(body, id, userId);
  }

  @Get('getallcomments/:id')
  @UseGuards(AuthenticationGuard)
  async getCommentsWithReplies(@Param() { id }: MongoIdDto) {
    return this.commentService.getCommentsWithReplies(id);
  }
}
