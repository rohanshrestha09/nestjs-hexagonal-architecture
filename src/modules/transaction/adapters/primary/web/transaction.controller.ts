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
import { CreateTransactionUseCase } from 'src/modules/transaction/application/usecases/create-transaction.usecase';
import { EsewaTransactionUseCase } from 'src/modules/transaction/application/usecases/esewa-transaction.usecase';
import { KhaltiTransactionUseCase } from 'src/modules/transaction/application/usecases/khalti-transaction.usecase';
import { EsewaTransactionVerificationDto } from 'src/modules/online-payment/application/dto/esewa-online-payment.dto';
import { KhaltiTransactionVerificationDto } from 'src/modules/online-payment/application/dto/khalti-online-payment.dto';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly esewaTransactionUseCase: EsewaTransactionUseCase,
    private readonly khaltiTransactionUseCase: KhaltiTransactionUseCase,
  ) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateTransactionDto })
  @Post('/')
  async createTransaction(
    @User(ROLE.USER) user: UserDomain,
    @Body(new ValidationPipe())
    createTransactionDto: CreateTransactionDto,
  ) {
    await this.createTransactionUseCase.createTransaction(
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
    const res = await this.esewaTransactionUseCase.verifyEsewaTransaction(
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
    const res = await this.khaltiTransactionUseCase.verifyKhaltiTransaction(
      transactionId,
      user,
      verifyTransactionDto,
    );

    return new ResponseDto('Transaction verified', res);
  }
}
