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

export class addCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
