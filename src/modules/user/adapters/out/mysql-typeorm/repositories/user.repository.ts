import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneOrThrow(options: FindOneOptions<UserEntity>) {
    return await this.userRepository.findOneOrFail(options);
  }

  async findOne(options?: FindOneOptions<UserEntity>) {
    return await this.userRepository.findOne(options);
  }

  async findMany(options?: FindManyOptions<UserEntity>) {
    return await this.userRepository.find(options);
  }

  async create(data: DeepPartial<UserEntity>) {
    return await this.userRepository.save(this.userRepository.create(data));
  }

  async update(
    criteria: FindOptionsWhere<UserEntity>,
    data: QueryDeepPartialEntity<UserEntity>,
  ) {
    await this.userRepository.update(criteria, data);
  }

  async delete(criteria: FindOptionsWhere<UserEntity>) {
    await this.userRepository.delete(criteria);
  }

  async count() {
    return this.userRepository.count();
  }
}
