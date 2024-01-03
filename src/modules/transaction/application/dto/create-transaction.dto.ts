import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PAYMENT_PROVIDER)
  paymentProvider: PAYMENT_PROVIDER;

  @ApiProperty()
  remarks: string;

  @ApiProperty()
  voucherImageLink: string;

  @ApiProperty()
  @IsNotEmpty()
  amount: number;

  @ApiHideProperty()
  date: Date = new Date();

  @ApiHideProperty()
  userId: string;
}
