import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Public } from 'src/utils/metadata';
import {
  LoginWithEmailDto,
  LoginWithPhoneDto,
} from 'src/modules/auth/application/dto/login-auth.dto';
import {
  RegisterWithEmailDto,
  RegisterWithPhoneDto,
} from 'src/modules/auth/application/dto/register-auth.dto';
import { User as UserDomain } from 'src/modules/user/domain/user.domain';
import { User } from 'src/modules/user/infrastructure/decorators/user.decorator';
import { AuthUseCase } from 'src/modules/auth/ports/in/auth-usecase.port';
import {
  VerifyEmailUserDto,
  VerifyPhoneUserDto,
} from 'src/modules/auth/application/dto/verify-user.dto';
import {
  ResetPasswordWithEmailDto,
  ResetPasswordWithPhoneDto,
} from 'src/modules/auth/application/dto/reset-password.dto';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login/email')
  async loginWithEmail(
    @Body(new ValidationPipe()) loginWithEmailDto: LoginWithEmailDto,
  ) {
    return await this.authUseCase.loginWithEmail(loginWithEmailDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register/email')
  async registerWithEmail(
    @Body(new ValidationPipe()) registerWithEmailDto: RegisterWithEmailDto,
  ) {
    return await this.authUseCase.registerWithEmail(registerWithEmailDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login/phone')
  async loginWithPhone(
    @Body(new ValidationPipe()) loginWithPhoneDto: LoginWithPhoneDto,
  ) {
    return await this.authUseCase.loginWithPhone(loginWithPhoneDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register/phone')
  async registerWithPhone(
    @Body(new ValidationPipe()) registerWithPhoneDto: RegisterWithPhoneDto,
  ) {
    return await this.authUseCase.registerWithPhone(registerWithPhoneDto);
  }

  @Public()
  @Post('verify/email')
  async verifyEmailUser(
    @Body(new ValidationPipe()) verifyEmailUserDto: VerifyEmailUserDto,
  ) {
    return await this.authUseCase.verifyEmailUser(verifyEmailUserDto);
  }

  @Public()
  @Post('verify/phone')
  async verifyPhoneUser(
    @Body(new ValidationPipe()) verifyPhoneUserDto: VerifyPhoneUserDto,
  ) {
    return await this.authUseCase.verifyPhoneUser(verifyPhoneUserDto);
  }

  @Public()
  @Post('forget-password/email/:email')
  async forgetEmailPassword(@Param('email') email: string) {
    return await this.authUseCase.forgetEmailPassword(email);
  }

  @Public()
  @Post('forget-password/phone/:phone')
  async forgetPhonePassword(@Param('phone') phone: string) {
    return await this.authUseCase.forgetPhonePassword(phone);
  }

  @Public()
  @Post('reset-password/email')
  async resetEmailPassword(
    @Body(new ValidationPipe())
    resetPasswordWithEmailDto: ResetPasswordWithEmailDto,
  ) {
    return await this.authUseCase.resetEmailPassword(resetPasswordWithEmailDto);
  }

  @Public()
  @Post('reset-password/phone')
  async resetPhonePassword(
    @Body(new ValidationPipe())
    resetPasswordWithPhoneDto: ResetPasswordWithPhoneDto,
  ) {
    return await this.authUseCase.resetPhonePassword(resetPasswordWithPhoneDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@User(ROLE.USER) user: UserDomain) {
    return await this.authUseCase.getProfile(user);
  }
}
