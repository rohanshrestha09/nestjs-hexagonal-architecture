import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';
import { TRANSACTION_STATUS } from '../infrastructure/enums/transaction.enum';

export type CreateTransactionProps = {
  paymentProvider: PAYMENT_PROVIDER;
  remarks: string;
  voucherImageLink: string;
  amount: number;
  userId: string;
};

export type UpdateTransactionProps = {
  status?: TRANSACTION_STATUS;
  paymentProviderId?: string;
};
