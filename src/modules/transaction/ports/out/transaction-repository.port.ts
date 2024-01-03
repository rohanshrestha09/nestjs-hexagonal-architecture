import { Transaction } from '../../domain/transaction.domain';

export abstract class TransactionRepositoryPort {
  abstract findUserTransactionById({
    userId,
    transactionId,
  }: {
    userId: string;
    transactionId: number;
  }): Promise<Transaction>;
  abstract findTransactionById(transactionId: number): Promise<Transaction>;
  abstract createTransaction(transaction: Transaction): Promise<Transaction>;
  abstract updateTransaction(
    transactionId: number,
    transaction: Partial<Transaction>,
  ): Promise<void>;
}
