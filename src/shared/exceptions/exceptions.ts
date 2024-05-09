import { HttpException } from '@nestjs/common';

export class unAuthenticateException extends HttpException {
  constructor() {
    super('unauthenticated', 401);
  }
}

export class MissingGuardException extends HttpException {
  constructor() {
    super('Action requires guard to be enabled', 403);
  }
}
