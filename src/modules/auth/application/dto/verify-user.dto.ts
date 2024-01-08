import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

export class VerifyEmailUserDto {
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @Length(6)
  @ApiProperty()
  public readonly code: string;
}

export class VerifyPhoneUserDto {
  @IsString()
  @ApiProperty()
  public readonly phone: string;

  @IsString()
  @Length(6)
  @ApiProperty()
  public readonly code: string;
}
