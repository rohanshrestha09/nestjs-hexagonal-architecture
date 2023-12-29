import { ApiProperty } from '@nestjs/swagger';

export class EsewaPaymentDto {
  amount: number;
  transactionId: string;
}

export class EsewaTransactionVerificationDto {
  @ApiProperty()
  encodedData: string;

  @ApiProperty()
  refId: string;
}
