import { Injectable } from '@nestjs/common';
import { TransactionDAO } from '../dao/transaction.dao';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';
import { EsewaOnlinePaymentUseCase } from 'src/modules/online-payment/application/usecases/esewa-online-payment.usecase';
import { KhaltiOnlinePaymentUseCase } from 'src/modules/online-payment/application/usecases/khalti-online-payment.usecase';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private transactionDAO: TransactionDAO,
    private esewaOnlinePaymentUseCase: EsewaOnlinePaymentUseCase,
    private khaltiOnlinePaymentUseCase: KhaltiOnlinePaymentUseCase,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const transaction =
      await this.transactionDAO.createTransaction(createTransactionDto);

    const onlinePaymentFactory = (paymentProvider: PAYMENT_PROVIDER) => {
      switch (paymentProvider) {
        case PAYMENT_PROVIDER.ESEWA:
          return this.esewaOnlinePaymentUseCase;
        case PAYMENT_PROVIDER.KHALTI:
          return this.khaltiOnlinePaymentUseCase;
      }
    };

    const response = await onlinePaymentFactory(
      createTransactionDto.paymentProvider,
    ).init({
      amount: createTransactionDto.amount,
      transactionId: String(transaction.id),
      purchaseOrderName: 'Nice',
    });

    return { ...response, transactionId: transaction.id };
  }
}
