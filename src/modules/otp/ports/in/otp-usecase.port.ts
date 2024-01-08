import { User } from 'src/modules/user/domain/user.domain';
import { Otp } from '../../domain/otp.domain';

export abstract class OtpUseCase {
  abstract sendOtpToEmail(otp: Otp): Promise<void>;
  abstract sendOtpToPhone(otp: Otp): Promise<void>;
  abstract verifyOtp(code: string, user: User): Promise<boolean>;
}
