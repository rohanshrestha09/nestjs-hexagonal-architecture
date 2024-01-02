import { Injectable } from '@nestjs/common';
import { TransactionRepositoryPort } from '../../ports/out/transaction-repository.port';
import { User } from 'src/modules/user/domain/user.domain';
import { TRANSACTION_STATUS } from '../../infrastructure/enums/transaction.enum';
import { EsewaOnlinePaymentUseCase } from 'src/modules/online-payment/application/usecases/esewa-online-payment.usecase';
import { EsewaTransactionVerificationDto } from 'src/modules/online-payment/application/dto/esewa-online-payment.dto';

@Injectable()
export class EsewaTransactionUseCase {
  constructor(
    private transactionRepositoryPort: TransactionRepositoryPort,
    private esewaOnlinePaymentUseCase: EsewaOnlinePaymentUseCase,
  ) {}

  async verifyEsewaTransaction(
    transactionId: number,
    user: User,
    verifyTransactionDto: EsewaTransactionVerificationDto,
  ) {
    const transaction =
      await this.transactionRepositoryPort.findUserTransactionById({
        userId: user.id,
        transactionId,
      });

    const res = await this.esewaOnlinePaymentUseCase.verify(
      {
        id: transaction.id,
        amount: transaction.amount,
      },
      verifyTransactionDto,
    );

    return this.transactionRepositoryPort.updateTransaction(transaction.id, {
      status: TRANSACTION_STATUS.SUCCESS,
      paymentProviderId: res?.refId,
    });
  }
}
