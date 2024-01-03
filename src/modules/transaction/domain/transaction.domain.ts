import { plainToInstance } from 'class-transformer';
import { User } from 'src/modules/user/domain/user.domain';
import {
  CreateTransactionProps,
  UpdateTransactionProps,
} from './transaction.types';
import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';
import { TRANSACTION_STATUS } from '../infrastructure/enums/transaction.enum';

export class Transaction {
  id: number;
  status: TRANSACTION_STATUS;
  paymentProvider: PAYMENT_PROVIDER;
  remarks: string;
  voucherImageLink: string;
  paymentProviderId: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;

  public static create(createTransactionProps: CreateTransactionProps) {
    return plainToInstance(Transaction, createTransactionProps, {
      exposeUnsetFields: false,
    });
  }

  public static update(updateTransactionProps: UpdateTransactionProps) {
    return plainToInstance(Transaction, updateTransactionProps, {
      exposeUnsetFields: false,
    });
  }

  public static toDomain(transaction: Transaction) {
    return plainToInstance(Transaction, transaction, {
      exposeUnsetFields: false,
    });
  }

  public static toDomains(transactions: Transaction[]) {
    return transactions?.map((transaction) => this.toDomain(transaction));
  }
}
