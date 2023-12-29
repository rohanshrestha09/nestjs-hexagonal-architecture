import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findOneOrThrow(options: FindOneOptions<RoleEntity>) {
    return await this.roleRepository.findOneOrFail(options);
  }

  async findOne(options?: FindOneOptions<RoleEntity>) {
    return await this.roleRepository.findOne(options);
  }

  async findMany(options?: FindManyOptions<RoleEntity>) {
    return await this.roleRepository.find(options);
  }

  async create(data: DeepPartial<RoleEntity>) {
    return await this.roleRepository.save(this.roleRepository.create(data));
  }

  async update(
    criteria: FindOptionsWhere<RoleEntity>,
    data: QueryDeepPartialEntity<RoleEntity>,
  ) {
    this.roleRepository.update(criteria, data);
  }

  async delete(criteria: FindOptionsWhere<RoleEntity>) {
    this.roleRepository.delete(criteria);
  }

  async count() {
    return this.roleRepository.count();
  }
}
