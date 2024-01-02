import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Optional, OrderItem } from 'sequelize';
import { PrivilegeEntity } from '../entities/privilege.entity';
import { BaseRepository } from 'src/base/repository/base.repository';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  DeepPartial,
  QueryDeepPartialEntity,
} from 'src/base/repository/base.repository.type';

@Injectable()
export class PrivilegeRepository implements BaseRepository<PrivilegeEntity> {
  constructor(
    @InjectModel(PrivilegeEntity)
    private privilegeRepository: typeof PrivilegeEntity,
  ) {}

  async findOneOrThrow(options: FindOneOptions<PrivilegeEntity>) {
    const result = await this.privilegeRepository.findOne({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      attributes: options?.select && Object.keys(options?.select),
    });

    if (!result) throw new Error('Privilege not found');

    return result;
  }

  async findOne(options?: FindOneOptions<PrivilegeEntity>) {
    return await this.privilegeRepository.findOne({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      attributes: options?.select && Object.keys(options?.select),
    });
  }

  async findMany(options?: FindManyOptions<PrivilegeEntity>) {
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

    return await this.privilegeRepository.findAll({
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

  async create(data: DeepPartial<PrivilegeEntity>) {
    return await this.privilegeRepository.create(
      data as Optional<any, string | number>,
    );
  }

  async update(
    criteria: FindOptionsWhere<PrivilegeEntity>,
    data: QueryDeepPartialEntity<PrivilegeEntity>,
  ) {
    await this.privilegeRepository.update(data, {
      where: criteria?.where,
      returning: true,
    });
  }

  async delete(criteria: FindOptionsWhere<PrivilegeEntity>) {
    await this.privilegeRepository.destroy(criteria);
  }

  async count(criteria?: FindManyOptions<PrivilegeEntity>) {
    return this.privilegeRepository.count(criteria);
  }
}
