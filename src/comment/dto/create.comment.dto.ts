import { IsNotEmpty, IsString } from 'class-validator';

export class addCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
