import { Injectable } from '@nestjs/common';
import { TransactionRepositoryPort } from '../../ports/out/transaction-repository.port';
import { Transaction } from '../../domain/transaction.domain';
import { EsewaOnlinePaymentUseCase } from 'src/modules/online-payment/application/usecases/esewa-online-payment.usecase';
import { KhaltiOnlinePaymentUseCase } from 'src/modules/online-payment/application/usecases/khalti-online-payment.usecase';
import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private transactionRepositoryPort: TransactionRepositoryPort,
    private esewaOnlinePaymentUseCase: EsewaOnlinePaymentUseCase,
    private khaltiOnlinePaymentUseCase: KhaltiOnlinePaymentUseCase,
  ) {}

  async createTransaction(createTransaction: Transaction) {
    const transaction =
      await this.transactionRepositoryPort.createTransaction(createTransaction);

    const onlinePaymentFactory = (paymentProvider: PAYMENT_PROVIDER) => {
      switch (paymentProvider) {
        case PAYMENT_PROVIDER.ESEWA:
          return this.esewaOnlinePaymentUseCase;
        case PAYMENT_PROVIDER.KHALTI:
          return this.khaltiOnlinePaymentUseCase;
      }
    };

    const response = await onlinePaymentFactory(
      transaction.paymentProvider,
    ).init({
      amount: transaction.amount,
      transactionId: String(transaction.id),
      purchaseOrderName: 'Nice',
    });

    return { ...response, transactionId: transaction.id };
  }
}
