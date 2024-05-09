import { IsInt, Min, Max } from 'class-validator';
import { IsMongoId } from 'class-validator';

export class MongoIdDto {
  @IsMongoId()
  readonly id: string;
}

export class RatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  readonly rating: number;
}
