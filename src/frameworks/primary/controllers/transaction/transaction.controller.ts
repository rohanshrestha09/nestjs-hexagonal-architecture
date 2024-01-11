import {
  Controller,
  ValidationPipe,
  Param,
  Body,
  Put,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User as UserDomain } from 'src/core/domain/user/user.domain';
import { TransactionUseCase } from 'src/core/ports/in/transaction/transaction-usecase.port';
import { CreateTransactionDto } from '../../dto/transaction/create-transaction.dto';
import { User } from '../../decorators/user/user.decorator';
import { ROLE } from 'src/common/enums/role.enum';
import { Transaction } from 'src/core/domain/transaction/transaction.domain';
import { ResponseDto } from '../../dto/response.dto';
import { EsewaTransactionVerificationDto } from '../../dto/transaction/esewa-transaction.dto';
import { KhaltiTransactionVerificationDto } from '../../dto/transaction/khalti-transaction.dto';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionUseCase: TransactionUseCase) {}

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
