import { HttpException, HttpStatus } from '@nestjs/common';

export class videoNotFound extends HttpException {
  constructor() {
    super('video not found', 444);
  }
}

export class userRestrected extends HttpException {
  constructor() {
    super('user age restriction', 444);
  }
}
