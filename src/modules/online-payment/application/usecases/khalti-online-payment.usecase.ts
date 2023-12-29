import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KhaltiService } from '@dallotech/nestjs-khalti';
import { AllConfig } from 'src/config/config.type';
import {
  KhaltiPaymentDto,
  KhaltiTransactionVerificationDto,
} from '../dto/khalti-online-payment.dto';
import { TransactionDto } from '../dto/transaction-online-payment.dto';

@Injectable()
export class KhaltiOnlinePaymentUseCase {
  constructor(
    private readonly khaltiService: KhaltiService,
    private readonly configService: ConfigService<AllConfig>,
  ) {}

  async init(data: KhaltiPaymentDto) {
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

  async verify(
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

    return {};
  }
}
