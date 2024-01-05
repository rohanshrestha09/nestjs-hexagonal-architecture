import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddCourseBookDto {
  @IsString()
  @ApiProperty()
  public readonly bookCode: string;
}
