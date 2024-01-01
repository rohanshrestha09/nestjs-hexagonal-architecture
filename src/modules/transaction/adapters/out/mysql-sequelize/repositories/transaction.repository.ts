import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionEntity } from '../entities/transaction.entity';
import { BaseRepository } from 'src/base/repository/base.repository';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  DeepPartial,
  QueryDeepPartialEntity,
} from 'src/base/repository/base.repository.type';

@Injectable()
export class TransactionRepository
  implements BaseRepository<TransactionEntity>
{
  constructor(
    @InjectModel(TransactionEntity)
    private transactionRepository: typeof TransactionEntity,
  ) {}

  async findOneOrThrow(options: FindOneOptions<TransactionEntity>) {
    const result = await this.transactionRepository.findOne({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      attributes: options?.select && Object.keys(options?.select),
    });

    if (!result) throw new Error('Transaction not found');

    return result;
  }

  async findOne(options?: FindOneOptions<TransactionEntity>) {
    return await this.transactionRepository.findOne({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      attributes: options?.select && Object.keys(options?.select),
    });
  }

  async findMany(options?: FindManyOptions<TransactionEntity>) {
    const sort = options?.order && Object?.keys(options?.order)?.[0];

    const order = options?.order && Object.values(options?.order)?.[0];

    return await this.transactionRepository.findAll({
      where: options?.where,
      include: options?.relations,
      offset: options?.skip,
      limit: options?.take,
      attributes: options?.select && Object.keys(options?.select),
      order: [sort, typeof order === 'string' && order],
    });
  }

  async create(data: DeepPartial<TransactionEntity>) {
    return await this.transactionRepository.create(
      data as { [x: string]: any },
    );
  }

  async update(
    criteria: FindOptionsWhere<TransactionEntity>,
    data: QueryDeepPartialEntity<TransactionEntity>,
  ) {
    await this.transactionRepository.update(data, {
      where: criteria?.where,
      returning: true,
    });
  }

  async delete(criteria: FindOptionsWhere<TransactionEntity>) {
    await this.transactionRepository.destroy(criteria);
  }

  async count(criteria?: FindManyOptions<TransactionEntity>) {
    return this.transactionRepository.count(criteria);
  }
}
