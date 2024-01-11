import { User } from 'src/core/domain/user/user.domain';
import {
  LoginWithEmailDto,
  LoginWithPhoneDto,
  RegisterWithEmailDto,
  RegisterWithPhoneDto,
  ResetPasswordWithEmailDto,
  ResetPasswordWithPhoneDto,
  VerifyEmailUserDto,
  VerifyPhoneUserDto,
} from './auth-usecase.types';

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
