import { TRANSACTION_STATUS } from 'src/common/enums/transaction.enum';

export class UpdateTransactionDto {
  status?: TRANSACTION_STATUS;
  paymentProviderId?: string;
}
