import { Injectable } from '@nestjs/common';
import { TransactionUseCasePort } from '../../ports/in/transaction-usecase.port';
import { TransactionRepositoryPort } from '../../ports/out/transaction-repository.port';
import { User } from 'src/modules/user/domain/user.domain';
import { Transaction } from '../../domain/transaction.domain';
import { OnlinePaymentUseCasePort } from 'src/modules/online-payment/ports/in/online-payment-usecase.port';
import { EsewaTransactionVerificationDto } from 'src/modules/online-payment/application/dto/esewa-online-payment.dto';
import { KhaltiTransactionVerificationDto } from 'src/modules/online-payment/application/dto/khalti-online-payment.dto';
import { TRANSACTION_STATUS } from '../../infrastructure/enums/transaction.enum';
import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';

@Injectable()
export class TransactionUseCase implements TransactionUseCasePort {
  constructor(
    private readonly transactionRepositoryPort: TransactionRepositoryPort,
    private readonly onlinePaymentUseCase: OnlinePaymentUseCasePort,
  ) {}

  async getTransactionById(transactionId: number) {
    return await this.transactionRepositoryPort.findTransactionById(
      transactionId,
    );
  }

  async createTransaction(createTransaction: Transaction) {
    const transaction =
      await this.transactionRepositoryPort.createTransaction(createTransaction);

    const onlinePaymentFactory = (paymentProvider: PAYMENT_PROVIDER) => {
      switch (paymentProvider) {
        case PAYMENT_PROVIDER.ESEWA:
          return this.onlinePaymentUseCase.initEsewaPayment;
        case PAYMENT_PROVIDER.KHALTI:
          return this.onlinePaymentUseCase.initKhaltiPayment;
      }
    };

    const response = await onlinePaymentFactory(transaction.paymentProvider)({
      amount: transaction.amount,
      transactionId: String(transaction.id),
      purchaseOrderName: 'Nice',
    });

    return { ...response, transactionId: transaction.id };
  }

  async updateTransaction(
    transactionId: number,
    transaction: Partial<Transaction>,
  ) {
    await this.transactionRepositoryPort.updateTransaction(
      transactionId,
      transaction,
    );
  }

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

    const res = await this.onlinePaymentUseCase.verifyEsewaPayment(
      {
        id: transaction.id,
        amount: transaction.amount,
      },
      verifyTransactionDto,
    );

    return this.transactionRepositoryPort.updateTransaction(transaction.id, {
      status: TRANSACTION_STATUS.SUCCESS,
      paymentProviderId: res?.refId as string,
    });
  }

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

    await this.onlinePaymentUseCase.verifyKhaltiPayment(
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
