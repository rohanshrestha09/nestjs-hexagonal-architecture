import { Transaction } from '../../domain/transaction.domain';

export class TransactionMapper {
  public static toDomain(transaction: Transaction): Transaction {
    return new Transaction(transaction);
  }

  public static toDomains(transactions: Transaction[]): Transaction[] {
    return transactions?.map((transaction) => this.toDomain(transaction));
  }
}
