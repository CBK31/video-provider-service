import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class MongoIdDto {
  @IsMongoId()
  @IsNotEmpty()
  id: Schema.Types.ObjectId;
}
