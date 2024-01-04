import { z } from 'zod';
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
    const createTransactionValidator = z.object({
      paymentProvider: z.nativeEnum(PAYMENT_PROVIDER),
      remarks: z.string(),
      voucherImageLink: z.string(),
      amount: z.number(),
      date: z.date().optional(),
      userId: z.string().uuid(),
    });

    return plainToInstance(
      Transaction,
      createTransactionValidator.parse(createTransactionProps),
      {
        exposeUnsetFields: false,
      },
    );
  }

  public static update(updateTransactionProps: UpdateTransactionProps) {
    const updateTransactionValidator = z.object({
      status: z.nativeEnum(TRANSACTION_STATUS).optional(),
      paymentProviderId: z.string().optional(),
    });

    return plainToInstance(
      Transaction,
      updateTransactionValidator.parse(updateTransactionProps),
      {
        exposeUnsetFields: false,
      },
    );
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
