import {
  EsewaPaymentDto,
  EsewaTransactionVerificationDto,
} from '../../application/dto/esewa-online-payment.dto';
import {
  KhaltiPaymentDto,
  KhaltiTransactionVerificationDto,
} from '../../application/dto/khalti-online-payment.dto';
import { TransactionDto } from '../../application/dto/transaction-online-payment.dto';

export abstract class OnlinePaymentUseCasePort {
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
