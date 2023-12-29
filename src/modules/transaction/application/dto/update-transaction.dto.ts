import { TRANSACTION_STATUS } from '../../infrastructure/enums/transaction.enum';

export class UpdateTransactionDto {
  status?: TRANSACTION_STATUS;
  paymentProviderId?: string;
}
