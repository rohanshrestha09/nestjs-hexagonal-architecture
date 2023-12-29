import { ApiProperty } from '@nestjs/swagger';

export class KhaltiPaymentDto {
  amount: number;
  transactionId: string;
  purchaseOrderName: string;
}

export class KhaltiTransactionVerificationDto {
  @ApiProperty()
  pidx: string;

  @ApiProperty()
  token: string;
}
