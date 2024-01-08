import {
  LoginWithEmailDto,
  LoginWithPhoneDto,
} from '../../application/dto/login-auth.dto';
import {
  RegisterWithEmailDto,
  RegisterWithPhoneDto,
} from '../../application/dto/register-auth.dto';
import {
  VerifyEmailUserDto,
  VerifyPhoneUserDto,
} from '../../application/dto/verify-user.dto';
import {
  ResetPasswordWithEmailDto,
  ResetPasswordWithPhoneDto,
} from '../../application/dto/reset-password.dto';
import { User } from 'src/modules/user/domain/user.domain';

export abstract class AuthUseCase {
  abstract loginWithEmail(
    loginWithEmailDto: LoginWithEmailDto,
  ): Promise<{ token: string }>;
  abstract registerWithEmail(
    registerWithEmailDto: RegisterWithEmailDto,
  ): Promise<void>;
  abstract loginWithPhone(
    loginWithPhoneDto: LoginWithPhoneDto,
  ): Promise<{ token: string }>;
  abstract registerWithPhone(
    registerWithPhoneDto: RegisterWithPhoneDto,
  ): Promise<void>;
  abstract verifyEmailUser(
    verifyEmailUserDto: VerifyEmailUserDto,
  ): Promise<{ token: string }>;
  abstract verifyPhoneUser(
    verifyPhoneUserDto: VerifyPhoneUserDto,
  ): Promise<{ token: string }>;
  abstract forgetEmailPassword(email: string): Promise<void>;
  abstract forgetPhonePassword(phone: string): Promise<void>;
  abstract resetEmailPassword(data: ResetPasswordWithEmailDto): Promise<void>;
  abstract resetPhonePassword(data: ResetPasswordWithPhoneDto): Promise<void>;
  abstract getProfile(
    user: User,
  ): Promise<{ data: User; isEnrolled: boolean; enrolledCoursesCount: number }>;
}
