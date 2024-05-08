import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MissingGuardException } from '../exceptions/exceptions';

export const GetUserDob = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    try {
      const request = ctx.switchToHttp().getRequest();
      return request.user.dob;
    } catch (error) {
      throw new MissingGuardException();
    }
  },
);
