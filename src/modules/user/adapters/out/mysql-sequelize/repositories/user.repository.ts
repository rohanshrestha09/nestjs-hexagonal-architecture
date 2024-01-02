import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Optional, OrderItem } from 'sequelize';
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
    const findRecurranceOrder = (order: object) => {
      const orderItem = [] as OrderItem[];

      Object.entries(order).forEach(([k, v]) => {
        if (typeof v === 'string') orderItem.push([k, v]);

        if (typeof v === 'object')
          Object.entries(v).forEach(([k1, v1]) => {
            if (typeof v1 === 'string') orderItem.push([k, k1, v1]);
          });
      });

      return orderItem;
    };

    return await this.userRepository.findAll({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      offset: options?.skip,
      limit: options?.take,
      attributes: options?.select && Object.keys(options?.select),
      order: options?.order && findRecurranceOrder(options?.order),
    });
  }

  async create(data: DeepPartial<UserEntity>) {
    return await this.userRepository.create(
      data as Optional<any, string | number>,
    );
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
