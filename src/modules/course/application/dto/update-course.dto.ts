import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { COURSE_STATUS } from '../../infrastructure/enums/course.enum';

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  offerPrice?: number;

  @IsEnum(COURSE_STATUS)
  @ApiProperty()
  @IsOptional()
  status?: COURSE_STATUS;
}
