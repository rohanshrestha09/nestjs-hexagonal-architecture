import { Injectable } from '@nestjs/common';
import { TransactionDAO } from '../dao/transaction.dao';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(private transactionDAO: TransactionDAO) {}

  async updateTransaction(
    transactionId: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.transactionDAO.updateTransaction(
      transactionId,
      updateTransactionDto,
    );
  }
}
