import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Optional, OrderItem } from 'sequelize';
import { RoleEntity } from '../entities/role.entity';
import { BaseRepository } from 'src/base/repository/base.repository';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  DeepPartial,
  QueryDeepPartialEntity,
} from 'src/base/repository/base.repository.type';

@Injectable()
export class RoleRepository implements BaseRepository<RoleEntity> {
  constructor(
    @InjectModel(RoleEntity)
    private roleRepository: typeof RoleEntity,
  ) {}

  async findOneOrThrow(options: FindOneOptions<RoleEntity>) {
    const result = await this.roleRepository.findOne({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      attributes: options?.select && Object.keys(options?.select),
    });

    if (!result) throw new Error('Role not found');

    return result;
  }

  async findOne(options?: FindOneOptions<RoleEntity>) {
    return await this.roleRepository.findOne({
      where: options?.where,
      include:
        options?.relations &&
        Object.entries(options?.relations).map(([k, v]) => v && k),
      attributes: options?.select && Object.keys(options?.select),
    });
  }

  async findMany(options?: FindManyOptions<RoleEntity>) {
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

    return await this.roleRepository.findAll({
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

  async create(data: DeepPartial<RoleEntity>) {
    return await this.roleRepository.create(
      data as Optional<any, string | number>,
    );
  }

  async update(
    criteria: FindOptionsWhere<RoleEntity>,
    data: QueryDeepPartialEntity<RoleEntity>,
  ) {
    await this.roleRepository.update(data, {
      where: criteria?.where,
      returning: true,
    });
  }

  async delete(criteria: FindOptionsWhere<RoleEntity>) {
    await this.roleRepository.destroy(criteria);
  }

  async count(criteria?: FindManyOptions<RoleEntity>) {
    return this.roleRepository.count(criteria);
  }
}
