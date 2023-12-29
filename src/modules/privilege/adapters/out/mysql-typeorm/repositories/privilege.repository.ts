import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrivilegeEntity } from '../entites/privilege.entity';
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
    @InjectRepository(PrivilegeEntity)
    private privilegeRepository: Repository<PrivilegeEntity>,
  ) {}

  async findOneOrThrow(options: FindOneOptions<PrivilegeEntity>) {
    return await this.privilegeRepository.findOneOrFail(options);
  }

  async findOne(options?: FindOneOptions<PrivilegeEntity>) {
    return await this.privilegeRepository.findOne(options);
  }

  async findMany(options?: FindManyOptions<PrivilegeEntity>) {
    return await this.privilegeRepository.find(options);
  }

  async create(data: DeepPartial<PrivilegeEntity>) {
    return await this.privilegeRepository.save(
      this.privilegeRepository.create(data),
    );
  }

  async update(
    criteria: FindOptionsWhere<PrivilegeEntity>,
    data: QueryDeepPartialEntity<PrivilegeEntity>,
  ) {
    this.privilegeRepository.update(criteria, data);
  }

  async delete(criteria: FindOptionsWhere<PrivilegeEntity>) {
    this.privilegeRepository.delete(criteria);
  }

  async count(criteria?: FindManyOptions<PrivilegeEntity>) {
    return this.privilegeRepository.count(criteria);
  }
}
