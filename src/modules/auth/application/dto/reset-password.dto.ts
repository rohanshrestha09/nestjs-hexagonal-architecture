import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class ResetPasswordWithPhoneDto {
  @IsString()
  @ApiProperty()
  public readonly phone: string;

  @IsString()
  @Length(6)
  @ApiProperty()
  public readonly code: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}

export class ResetPasswordWithEmailDto {
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @Length(6)
  @ApiProperty()
  public readonly code: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}
