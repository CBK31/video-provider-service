import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MissingGuardException } from '../exceptions/exceptions';

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    try {
      const request = ctx.switchToHttp().getRequest();
      return request.user._id;
    } catch (error) {
      throw new MissingGuardException();
    }
  },
);
