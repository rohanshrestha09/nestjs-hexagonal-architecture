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
import { LoginUseCase } from 'src/modules/auth/application/usecases/login-auth.usecase';
import { RegisterUseCase } from 'src/modules/auth/application/usecases/register-auth.usecase';
import { LoginDto } from 'src/modules/auth/application/dto/login-auth.dto';
import { RegisterDto } from 'src/modules/auth/application/dto/register-auth.dto';
import { User as UserDomain } from 'src/modules/user/domain/user.domain';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';
import { User } from 'src/modules/user/infrastructure/decorators/user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return await this.loginUseCase.login(loginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return await this.registerUseCase.register(registerDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@User(ROLE.USER) user: UserDomain) {
    return new ResponseDto('Profile fetched', user);
  }
}
