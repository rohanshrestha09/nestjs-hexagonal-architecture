import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { EsewaModule } from '@dallotech/nestjs-esewa';
import { KhaltiModule } from '@dallotech/nestjs-khalti';
import { AllConfig } from 'src/infrastructure/config/config.type';
import { EsewaOptions } from '@dallotech/nestjs-esewa/dist/esewa.interface';
import { KhaltiOptions } from '@dallotech/nestjs-khalti/dist/khalti.interface';
import { OnlinePaymentUseCase } from 'src/core/ports/in/online-payment/online-payment-usecase.port';
import { OnlinePaymentUseCaseImpl } from 'src/core/application/usecases/online-payment/online-payment.usecase';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    EsewaModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) =>
        ({
          productCode: configService.get('esewa.productCode', { infer: true }),
          paymentMode: configService.get('esewa.paymentMode', { infer: true }),
          secretKey: configService.get('esewa.secret', { infer: true }),
          merchantId: configService.get('esewa.merchantId', { infer: true }),
          merchantSecret: configService.get('esewa.merchantSecret', {
            infer: true,
          }),
        }) as EsewaOptions,
    }),
    KhaltiModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) =>
        ({
          secretKey: configService.get('khalti.secretKey', { infer: true }),
          paymentMode: configService.get('khalti.paymentMode', { infer: true }),
        }) as KhaltiOptions,
    }),
  ],
  providers: [
    {
      provide: OnlinePaymentUseCase,
      useClass: OnlinePaymentUseCaseImpl,
    },
  ],
  exports: [OnlinePaymentUseCase],
})
export class OnlinePaymentModule {}
