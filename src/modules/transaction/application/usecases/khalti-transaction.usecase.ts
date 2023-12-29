import { Injectable } from '@nestjs/common';
import { TransactionDAO } from '../dao/transaction.dao';
import { User } from 'src/modules/user/domain/user.domain';
import { TRANSACTION_STATUS } from '../../infrastructure/enums/transaction.enum';
import { KhaltiOnlinePaymentUseCase } from 'src/modules/online-payment/application/usecases/khalti-online-payment.usecase';
import { KhaltiTransactionVerificationDto } from 'src/modules/online-payment/application/dto/khalti-online-payment.dto';

@Injectable()
export class KhaltiTransactionUseCase {
  constructor(
    private transactionDAO: TransactionDAO,
    private khaltiOnlinePaymentUseCase: KhaltiOnlinePaymentUseCase,
  ) {}

  async verifyKhaltiTransaction(
    transactionId: number,
    user: User,
    verifyTransactionDto: KhaltiTransactionVerificationDto,
  ) {
    const transaction = await this.transactionDAO.findUserTransactionById({
      userId: user.id,
      transactionId,
    });

    await this.khaltiOnlinePaymentUseCase.verify(
      {
        id: transaction.id,
        amount: transaction.amount,
      },
      verifyTransactionDto,
    );

    return this.transactionDAO.updateTransaction(transaction.id, {
      status: TRANSACTION_STATUS.SUCCESS,
    });
  }
}
