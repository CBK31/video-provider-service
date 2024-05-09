import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class MongoIdDto {
  @IsMongoId()
  @IsNotEmpty()
  id: Schema.Types.ObjectId;
}

export class replyCommentDto extends MongoIdDto {
  @IsMongoId()
  @IsNotEmpty()
  commentId: Schema.Types.ObjectId;
}
