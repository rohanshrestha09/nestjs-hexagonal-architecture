import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Public } from 'src/utils/metadata';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { LoginDto } from 'src/modules/auth/application/dto/login-auth.dto';
import { RegisterDto } from 'src/modules/auth/application/dto/register-auth.dto';
import { User as UserDomain } from 'src/modules/user/domain/user.domain';
import { User } from 'src/modules/user/infrastructure/decorators/user.decorator';
import { AuthUseCase } from 'src/modules/auth/ports/in/auth-usecase.port';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return await this.authUseCase.login(loginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return await this.authUseCase.register(registerDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@User(ROLE.USER) user: UserDomain) {
    return new ResponseDto('Profile fetched', user);
  }
}
