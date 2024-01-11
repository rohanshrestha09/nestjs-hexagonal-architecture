import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { BOOK_STATUS } from 'src/common/enums/book.enum';

export class UpdateBookDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  public readonly offerPrice?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly description?: string;

  @IsEnum(BOOK_STATUS)
  @IsOptional()
  @ApiProperty()
  public readonly status: BOOK_STATUS;
}
