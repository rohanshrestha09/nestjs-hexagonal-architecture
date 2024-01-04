import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/domain/user.domain';
import { Transaction } from '../../domain/transaction.domain';
import { OnlinePaymentUseCase } from 'src/modules/online-payment/ports/in/online-payment-usecase.port';
import { EsewaTransactionVerificationDto } from 'src/modules/online-payment/application/dto/esewa-online-payment.dto';
import { KhaltiTransactionVerificationDto } from 'src/modules/online-payment/application/dto/khalti-online-payment.dto';
import { TransactionUseCase } from '../../ports/in/transaction-usecase.port';
import { TransactionRepository } from '../../ports/out/transaction-repository.port';
import { TRANSACTION_STATUS } from '../../infrastructure/enums/transaction.enum';
import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';

@Injectable()
export class TransactionUseCaseImpl implements TransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly onlinePaymentUseCase: OnlinePaymentUseCase,
  ) {}

  async getTransactionById(transactionId: number) {
    return await this.transactionRepository.findTransactionById(transactionId);
  }

  async createTransaction(createTransaction: Transaction) {
    const transaction =
      await this.transactionRepository.createTransaction(createTransaction);

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
    await this.transactionRepository.updateTransaction(
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
      await this.transactionRepository.findUserTransactionById({
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

    return this.transactionRepository.updateTransaction(transaction.id, {
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
      await this.transactionRepository.findUserTransactionById({
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

    return this.transactionRepository.updateTransaction(transaction.id, {
      status: TRANSACTION_STATUS.SUCCESS,
    });
  }
}
