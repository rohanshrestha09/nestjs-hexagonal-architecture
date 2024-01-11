import { Injectable } from '@nestjs/common';
import { OtpUseCase } from 'src/core/ports/in/otp/otp-usecase.port';

@Injectable()
export class OtpUseCaseImpl implements OtpUseCase {
  async sendOtpToEmail() {}

  async sendOtpToPhone() {}

  async verifyOtp() {
    return true;
  }
}
