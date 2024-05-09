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
  async getCommentsWithReplies(@Param() param: MongoIdDto) {
    return this.commentService.getCommentsWithReplies(param);
  }
}
