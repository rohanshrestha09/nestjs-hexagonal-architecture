import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginWithEmailDto {
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}

export class LoginWithPhoneDto {
  @IsString()
  @ApiProperty()
  public readonly phone: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}
