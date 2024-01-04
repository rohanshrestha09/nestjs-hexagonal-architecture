import { User } from 'src/modules/user/domain/user.domain';
import { Transaction } from '../../domain/transaction.domain';
import { EsewaTransactionVerificationDto } from 'src/modules/online-payment/application/dto/esewa-online-payment.dto';
import { KhaltiTransactionVerificationDto } from 'src/modules/online-payment/application/dto/khalti-online-payment.dto';

export abstract class TransactionUseCasePort {
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
