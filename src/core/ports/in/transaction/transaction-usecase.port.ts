import { Transaction } from 'src/core/domain/transaction/transaction.domain';
import { User } from 'src/core/domain/user/user.domain';
import {
  EsewaTransactionVerificationDto,
  KhaltiTransactionVerificationDto,
} from '../online-payment/online-payment-usecase.types';

export abstract class TransactionUseCase {
  abstract getTransactionById(transactionId: number): Promise<Transaction>;
  abstract createTransaction(
    transaction: Transaction,
  ): Promise<{ transactionId: number }>;
  abstract updateTransaction(
    transactionId: number,
    transaction: Partial<Transaction>,
  ): Promise<void>;
  abstract verifyEsewaTransaction(
    transactionId: number,
    user: User,
    verifyTransactionDto: EsewaTransactionVerificationDto,
  ): Promise<void>;
  abstract verifyKhaltiTransaction(
    transactionId: number,
    user: User,
    verifyTransactionDto: KhaltiTransactionVerificationDto,
  ): Promise<void>;
}
