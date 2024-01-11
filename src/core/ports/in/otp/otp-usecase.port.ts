import { Otp } from 'src/core/domain/otp/otp.domain';
import { User } from 'src/core/domain/user/user.domain';

export abstract class OtpUseCase {
  abstract sendOtpToEmail(otp: Otp): Promise<void>;
  abstract sendOtpToPhone(otp: Otp): Promise<void>;
  abstract verifyOtp(code: string, user: User): Promise<boolean>;
}
