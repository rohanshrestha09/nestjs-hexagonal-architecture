import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { COURSE_STATUS } from 'src/common/enums/course.enum';

export class CreateCourseDto {
  @IsString()
  @ApiProperty()
  code: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  offerPrice: number;

  @IsEnum(COURSE_STATUS)
  @ApiProperty()
  status: COURSE_STATUS;
}
