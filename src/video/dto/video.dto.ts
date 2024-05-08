import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class VideoIdDto {
  @IsMongoId()
  userId: string;
}

export class GetAllVideosDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isSortByRating?: boolean;
}
