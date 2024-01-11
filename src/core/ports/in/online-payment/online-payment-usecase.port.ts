import {
  EsewaPaymentDto,
  EsewaTransactionVerificationDto,
  KhaltiPaymentDto,
  KhaltiTransactionVerificationDto,
  TransactionDto,
} from './online-payment-usecase.types';

export abstract class OnlinePaymentUseCase {
  abstract initEsewaPayment(data: EsewaPaymentDto): Promise<void>;
  abstract initKhaltiPayment(
    data: KhaltiPaymentDto,
  ): Promise<{ pidx: unknown }>;
  abstract verifyEsewaPayment(
    transactionDto: TransactionDto,
    verifyEsewaTransactionDto: EsewaTransactionVerificationDto,
  ): Promise<{ refId: unknown }>;
  abstract verifyKhaltiPayment(
    transactionDto: TransactionDto,
    verifyKhaltiTransactionDto: KhaltiTransactionVerificationDto,
  ): Promise<void>;
}
