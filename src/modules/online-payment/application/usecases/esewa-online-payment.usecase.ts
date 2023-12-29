import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EsewaService } from '@dallotech/nestjs-esewa';
import { AllConfig } from 'src/config/config.type';
import {
  EsewaPaymentDto,
  EsewaTransactionVerificationDto,
} from '../dto/esewa-online-payment.dto';
import { TransactionDto } from '../dto/transaction-online-payment.dto';

@Injectable()
export class EsewaOnlinePaymentUseCase {
  constructor(
    private readonly esewaService: EsewaService,
    private readonly configService: ConfigService<AllConfig>,
  ) {}

  async init(data: EsewaPaymentDto) {
    const { amount, transactionId } = data;

    return this.esewaService.init({
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

  async verify(
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
}
