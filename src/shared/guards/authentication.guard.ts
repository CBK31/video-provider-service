import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
import { unAuthenticateException } from '../exceptions/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    // @InjectModel(User.name) private userModel: Model<User>,
  ) {}
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
        requestInfo.user.id = payload['_id'];
        requestInfo.user.dob = payload['dob'];
      }
    } catch (error) {
      //  console.log(error);
      throw new unAuthenticateException();
    }
    return true;
  }
}
