import { Module } from '@nestjs/common';
import { OtpUseCase } from './ports/in/otp-usecase.port';
import { OtpUseCaseImpl } from './application/usecases/otp.usecase';

@Module({
  providers: [
    {
      provide: OtpUseCase,
      useClass: OtpUseCaseImpl,
    },
  ],
  exports: [OtpUseCase],
})
export class OtpModule {}
