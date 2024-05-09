import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { unAuthenticateException } from '../exceptions/exceptions';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requestInfo = context.switchToHttp().getRequest();
      const token = requestInfo.headers.authorization.split(' ')[1];

      if (!token) {
        throw new unAuthenticateException();
      } else {
        const payload = this.jwtService.verify(token);
        if (!payload || !payload['_id'] || !payload['dob']) {
          throw new unAuthenticateException();
        }
        requestInfo.user = payload;
      }
    } catch (error) {
      throw new unAuthenticateException();
    }
    return true;
  }
}
