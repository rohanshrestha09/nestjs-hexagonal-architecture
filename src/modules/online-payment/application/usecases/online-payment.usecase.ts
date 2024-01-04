import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EsewaService } from '@dallotech/nestjs-esewa';
import { KhaltiService } from '@dallotech/nestjs-khalti';
import { AllConfig } from 'src/config/config.type';
import { OnlinePaymentUseCase } from '../../ports/in/online-payment-usecase.port';
import {
  EsewaPaymentDto,
  EsewaTransactionVerificationDto,
} from '../dto/esewa-online-payment.dto';
import { TransactionDto } from '../dto/transaction-online-payment.dto';
import {
  KhaltiPaymentDto,
  KhaltiTransactionVerificationDto,
} from '../dto/khalti-online-payment.dto';

@Injectable()
export class OnlinePaymentUseCaseImpl implements OnlinePaymentUseCase {
  constructor(
    private readonly esewaService: EsewaService,
    private readonly khaltiService: KhaltiService,
    private readonly configService: ConfigService<AllConfig>,
  ) {}

  async initEsewaPayment(data: EsewaPaymentDto) {
    const { amount, transactionId } = data;

    this.esewaService.init({
      amount,
      productServiceCharge: 0,
      productDeliveryCharge: 0,
      taxAmount: 0,
      totalAmount: amount,
      transactionUuid: transactionId,
      successUrl: `${this.configService.get('app.frontendUrl', {
        infer: true,
      })}/paymentSuccess`,
      failureUrl: `${this.configService.get('app.frontendUrl', {
        infer: true,
      })}/paymentError`,
    });
  }

  async verifyEsewaPayment(
    transactionDto: TransactionDto,
    verifyTransactionDto: EsewaTransactionVerificationDto,
  ) {
    const { encodedData } = verifyTransactionDto;

    if (!encodedData || !transactionDto) {
      throw new InternalServerErrorException(
        'Data missing for validating Esewa payment',
      );
    }
    const response = await this.esewaService.verify({ encodedData });

    const { status, ref_id, total_amount, transaction_uuid } = response?.data;

    if (status?.localeCompare('COMPLETE') != 0) {
      throw new InternalServerErrorException(
        'Esewa Payment not verified. Please contact admin',
      );
    }

    if (transactionDto.amount != total_amount) {
      throw new InternalServerErrorException(
        'Esewa Payment amount miss matched. Please contact admin',
      );
    }

    if (transactionDto.id.toString() != transaction_uuid) {
      throw new InternalServerErrorException(
        'Transaction Id miss matched. Please contact admin',
      );
    }

    return { refId: ref_id };
  }

  async initKhaltiPayment(data: KhaltiPaymentDto) {
    const { amount, transactionId, purchaseOrderName } = data;

    const response = await this.khaltiService.init({
      returnUrl: `${this.configService.get('app.frontendUrl', {
        infer: true,
      })}/paymentSuccess`,
      websiteUrl: `${this.configService.get('app.frontendUrl', {
        infer: true,
      })}`,
      amount: amount * 100,
      purchaseOrderId: transactionId,
      purchaseOrderName: purchaseOrderName,
    });

    const responseData = response?.data;

    const pidx = responseData?.pidx;

    return { pidx };
  }

  async verifyKhaltiPayment(
    transactionDto: TransactionDto,
    verifyTransactionDto: KhaltiTransactionVerificationDto,
  ) {
    const { pidx } = verifyTransactionDto;

    if (!pidx || !transactionDto) {
      throw new InternalServerErrorException(
        'Data missing for validating Khalti payment',
      );
    }
    const response = await this.khaltiService.lookUp({ pidx });

    const responseData = response?.data;

    if (responseData?.status?.localeCompare('Completed') != 0) {
      throw new InternalServerErrorException(
        'Payment not verified. Please contact admin',
      );
    }

    if (transactionDto.amount != responseData?.total_amount / 100) {
      throw new InternalServerErrorException(
        'Khalti Payment amount miss matched. Please contact admin',
      );
    }
  }
}
