import { HttpException, HttpStatus } from '@nestjs/common';

export class videoNotFound extends HttpException {
  constructor() {
    super('video not found', 444);
  }
}

// export class fetchingVideoIdError extends HttpException {
//   constructor() {
//     super('error while fetching videos Id ', 401);
//   }
// }
