import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async findOneOrThrow(options: FindOneOptions<TransactionEntity>) {
    return await this.transactionRepository.findOneOrFail(options);
  }

  async findOne(options?: FindOneOptions<TransactionEntity>) {
    return await this.transactionRepository.findOne(options);
  }

  async findMany(options?: FindManyOptions<TransactionEntity>) {
    return await this.transactionRepository.find(options);
  }

  async create(data: DeepPartial<TransactionEntity>) {
    return await this.transactionRepository.save(
      this.transactionRepository.create(data),
    );
  }

  async update(
    criteria: FindOptionsWhere<TransactionEntity>,
    data: QueryDeepPartialEntity<TransactionEntity>,
  ) {
    this.transactionRepository.update(criteria, data);
  }

  async delete(criteria: FindOptionsWhere<TransactionEntity>) {
    this.transactionRepository.delete(criteria);
  }

  async count() {
    return this.transactionRepository.count();
  }
}
