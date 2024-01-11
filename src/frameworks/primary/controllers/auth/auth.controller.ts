import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUseCase } from 'src/core/ports/in/auth/auth-usecase.port';
import { Public } from '../../metadata';
import { User } from '../../decorators/user/user.decorator';
import { User as UserDomain } from 'src/core/domain/user/user.domain';
import {
  LoginWithEmailDto,
  LoginWithPhoneDto,
} from '../../dto/auth/login-auth.dto';
import {
  RegisterWithEmailDto,
  RegisterWithPhoneDto,
} from '../../dto/auth/register-auth.dto';
import {
  VerifyEmailUserDto,
  VerifyPhoneUserDto,
} from '../../dto/auth/verify-user-auth.dto';
import {
  ResetPasswordWithEmailDto,
  ResetPasswordWithPhoneDto,
} from '../../dto/auth/reset-password-auth.dto';
import { ROLE } from 'src/common/enums/role.enum';

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
