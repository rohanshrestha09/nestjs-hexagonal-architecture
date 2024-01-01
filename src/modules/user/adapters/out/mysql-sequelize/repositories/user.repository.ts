import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../entities/user.entity';
import { BaseRepository } from 'src/base/repository/base.repository';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  DeepPartial,
  QueryDeepPartialEntity,
} from 'src/base/repository/base.repository.type';

@Injectable()
export class UserRepository implements BaseRepository<UserEntity> {
  constructor(
    @InjectModel(UserEntity)
    private userRepository: typeof UserEntity,
  ) {}

  async findOneOrThrow(options: FindOneOptions<UserEntity>) {
    const result = await this.userRepository.findOne({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      attributes: options?.select && Object.keys(options?.select),
    });

    if (!result) throw new Error('User not found');

    return result;
  }

  async findOne(options?: FindOneOptions<UserEntity>) {
    return await this.userRepository.findOne({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      attributes: options?.select && Object.keys(options?.select),
    });
  }

  async findMany(options?: FindManyOptions<UserEntity>) {
    const sort = options?.order && Object?.keys(options?.order)?.[0];

    const order = options?.order && Object.values(options?.order)?.[0];

    return await this.userRepository.findAll({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      offset: options?.skip,
      limit: options?.take,
      attributes: options?.select && Object.keys(options?.select),
      order: [sort, typeof order === 'string' && order],
    });
  }

  async create(data: DeepPartial<UserEntity>) {
    return await this.userRepository.create(data as { [x: string]: any });
  }

  async update(
    criteria: FindOptionsWhere<UserEntity>,
    data: QueryDeepPartialEntity<UserEntity>,
  ) {
    await this.userRepository.update(data, {
      where: criteria?.where,
      returning: true,
    });
  }

  async delete(criteria: FindOptionsWhere<UserEntity>) {
    await this.userRepository.destroy(criteria);
  }

  async count(criteria?: FindManyOptions<UserEntity>) {
    return this.userRepository.count(criteria);
  }
}
