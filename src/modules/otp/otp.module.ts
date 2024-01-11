import { Module } from '@nestjs/common';
import { OtpUseCaseImpl } from 'src/core/application/usecases/otp/otp.usecase';
import { OtpUseCase } from 'src/core/ports/in/otp/otp-usecase.port';

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
