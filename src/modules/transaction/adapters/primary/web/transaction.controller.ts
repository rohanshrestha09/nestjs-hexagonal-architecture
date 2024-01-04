import {
  Controller,
  ValidationPipe,
  Param,
  Body,
  Put,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User as UserDomain } from 'src/modules/user/domain/user.domain';
import { User } from 'src/modules/user/infrastructure/decorators/user.decorator';
import { Transaction } from 'src/modules/transaction/domain/transaction.domain';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { CreateTransactionDto } from 'src/modules/transaction/application/dto/create-transaction.dto';
import { EsewaTransactionVerificationDto } from 'src/modules/online-payment/application/dto/esewa-online-payment.dto';
import { KhaltiTransactionVerificationDto } from 'src/modules/online-payment/application/dto/khalti-online-payment.dto';
import { TransactionUseCasePort } from 'src/modules/transaction/ports/in/transaction-usecase.port';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionUseCase: TransactionUseCasePort) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateTransactionDto })
  @Post('/')
  async createTransaction(
    @User(ROLE.USER) user: UserDomain,
    @Body(new ValidationPipe())
    createTransactionDto: CreateTransactionDto,
  ) {
    await this.transactionUseCase.createTransaction(
      Transaction.create({
        ...createTransactionDto,
        userId: user.id,
      }),
    );

    return new ResponseDto('Transaction created');
  }

  @ApiBearerAuth()
  @ApiBody({
    type: EsewaTransactionVerificationDto,
  })
  @Put('/:transactionId/esewa')
  async verifyEsewaTransaction(
    @Param('transactionId') transactionId: number,
    @User(ROLE.USER) user: UserDomain,
    @Body(new ValidationPipe())
    verifyTransactionDto: EsewaTransactionVerificationDto,
  ) {
    const res = await this.transactionUseCase.verifyEsewaTransaction(
      transactionId,
      user,
      verifyTransactionDto,
    );

    return new ResponseDto('Transaction verified', res);
  }

  @ApiBearerAuth()
  @ApiBody({
    type: KhaltiTransactionVerificationDto,
  })
  @Put('/:transactionId/khalti')
  async verifyKhaltiTransaction(
    @Param('transactionId') transactionId: number,
    @User(ROLE.USER) user: UserDomain,
    @Body(new ValidationPipe())
    verifyTransactionDto: KhaltiTransactionVerificationDto,
  ) {
    const res = await this.transactionUseCase.verifyKhaltiTransaction(
      transactionId,
      user,
      verifyTransactionDto,
    );

    return new ResponseDto('Transaction verified', res);
  }
}
