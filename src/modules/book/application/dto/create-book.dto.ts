import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { BOOK_STATUS } from '../../infrastructure/enums/book.enum';

export class CreateBookDto {
  @IsString()
  @ApiProperty()
  public readonly code: string;

  @IsString()
  @ApiProperty()
  public readonly title: string;

  @IsString()
  @ApiProperty()
  public readonly author: string;

  @IsString()
  @ApiProperty()
  public readonly publisher: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  public readonly price: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  public readonly offerPrice: number;

  @IsString()
  @ApiProperty()
  public readonly description: string;

  @IsDateString()
  @ApiProperty()
  public readonly publishedDate: Date;

  @IsString()
  @ApiProperty()
  public readonly edition: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  public readonly pages: number;

  @IsEnum(BOOK_STATUS)
  @ApiProperty()
  public readonly status: BOOK_STATUS;
}
