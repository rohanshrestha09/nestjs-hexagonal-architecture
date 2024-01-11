import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @ApiProperty()
  public readonly title: string;

  @IsString()
  @ApiProperty()
  public readonly content: string;
}
