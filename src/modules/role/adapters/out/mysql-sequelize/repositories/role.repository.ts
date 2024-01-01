import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
    const sort = options?.order && Object?.keys(options?.order)?.[0];

    const order = options?.order && Object.values(options?.order)?.[0];

    return await this.roleRepository.findAll({
      where: options?.where,
      include: options?.relations,
      offset: options?.skip,
      limit: options?.take,
      attributes: options?.select && Object.keys(options?.select),
      order: [sort, typeof order === 'string' && order],
    });
  }

  async create(data: DeepPartial<RoleEntity>) {
    return await this.roleRepository.create(data as { [x: string]: any });
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
