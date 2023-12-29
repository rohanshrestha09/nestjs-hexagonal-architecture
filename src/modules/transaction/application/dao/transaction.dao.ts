import { Transaction } from '../../domain/transaction.domain';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

export abstract class TransactionDAO {
  abstract findUserTransactionById({
    userId,
    transactionId,
  }: {
    userId: string;
    transactionId: number;
  }): Promise<Transaction>;
  abstract findTransactionById(transactionId: number): Promise<Transaction>;
  abstract createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction>;
  abstract updateTransaction(
    transactionId: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<void>;
}
