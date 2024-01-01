import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
    const sort = options?.order && Object?.keys(options?.order)?.[0];

    const order = options?.order && Object.values(options?.order)?.[0];

    return await this.privilegeRepository.findAll({
      where: options?.where,
      include: options?.relations,
      offset: options?.skip,
      limit: options?.take,
      attributes: options?.select && Object.keys(options?.select),
      order: [sort, typeof order === 'string' && order],
    });
  }

  async create(data: DeepPartial<PrivilegeEntity>) {
    return await this.privilegeRepository.create(data as { [x: string]: any });
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
