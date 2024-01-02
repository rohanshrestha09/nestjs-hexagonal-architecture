import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/domain/user.domain';
import { TransactionRepositoryPort } from '../../ports/out/transaction-repository.port';
import { KhaltiOnlinePaymentUseCase } from 'src/modules/online-payment/application/usecases/khalti-online-payment.usecase';
import { KhaltiTransactionVerificationDto } from 'src/modules/online-payment/application/dto/khalti-online-payment.dto';
import { TRANSACTION_STATUS } from '../../infrastructure/enums/transaction.enum';

@Injectable()
export class KhaltiTransactionUseCase {
  constructor(
    private transactionRepositoryPort: TransactionRepositoryPort,
    private khaltiOnlinePaymentUseCase: KhaltiOnlinePaymentUseCase,
  ) {}

  async verifyKhaltiTransaction(
    transactionId: number,
    user: User,
    verifyTransactionDto: KhaltiTransactionVerificationDto,
  ) {
    const transaction =
      await this.transactionRepositoryPort.findUserTransactionById({
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

    return this.transactionRepositoryPort.updateTransaction(transaction.id, {
      status: TRANSACTION_STATUS.SUCCESS,
    });
  }
}
