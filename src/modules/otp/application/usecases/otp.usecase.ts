import { Injectable } from '@nestjs/common';
import { OtpUseCase } from '../../ports/in/otp-usecase.port';

@Injectable()
export class OtpUseCaseImpl implements OtpUseCase {
  async sendOtpToEmail() {}

  async sendOtpToPhone() {}

  async verifyOtp() {
    return true;
  }
}
