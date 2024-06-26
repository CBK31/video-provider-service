import { HttpException } from '@nestjs/common';

export class videoNotFound extends HttpException {
  constructor() {
    super('Video not found', 404);
  }
}

export class userRestrected extends HttpException {
  constructor() {
    super('User age restriction violation', 403);
  }
}
export class CommentNotFound extends HttpException {
  constructor() {
    super('Comment not found', 404);
  }
}
