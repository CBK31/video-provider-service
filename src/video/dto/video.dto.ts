import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { IsMongoId } from 'class-validator';

//
export class MongoIdDto {
  @IsMongoId()
  id: string;
}
enum booleanEnum {
  true = 'true',
  false = 'false',
}
export class GetAllVideosDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(booleanEnum)
  isSortByRating?: boolean;
}
