import { Injectable } from '@nestjs/common';
import { TransactionDAO } from '../dao/transaction.dao';

@Injectable()
export class GetTransactionUseCase {
  constructor(private transactionDAO: TransactionDAO) {}

  async getTransactionById(transactionId: number) {
    return await this.transactionDAO.findTransactionById(transactionId);
  }
}
