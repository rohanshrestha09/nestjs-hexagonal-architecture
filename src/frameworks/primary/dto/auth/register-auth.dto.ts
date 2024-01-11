import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RegisterWithEmailDto {
  @ApiProperty()
  public readonly name: string;

  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}

export class RegisterWithPhoneDto {
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  public readonly phone: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}
