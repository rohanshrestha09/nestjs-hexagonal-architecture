import { Injectable } from '@nestjs/common';
import { TransactionRepositoryPort } from '../../ports/out/transaction-repository.port';

@Injectable()
export class GetTransactionUseCase {
  constructor(private transactionRepositoryPort: TransactionRepositoryPort) {}

  async getTransactionById(transactionId: number) {
    return await this.transactionRepositoryPort.findTransactionById(
      transactionId,
    );
  }
}
