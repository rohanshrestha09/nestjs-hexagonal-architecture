import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @ApiProperty({ required: false, default: 1 })
  @IsInt()
  @Type(() => Number)
  public readonly page: number = 1;

  @ApiProperty({ required: false, default: 20 })
  @IsInt()
  @Type(() => Number)
  public readonly size: number = 20;

  @ApiProperty({ required: false, default: 'updatedAt' })
  @IsString()
  public readonly sort: string = 'updatedAt';

  @ApiProperty({ required: false, enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  public readonly order: 'ASC' | 'DESC' = 'DESC';
}
