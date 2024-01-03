import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import {
  UserConfig,
  UserRepositoryPort,
} from 'src/modules/user/ports/out/user-repository.port';
import { UserMapper } from 'src/modules/user/infrastructure/mapper/user.mapper';
import { CreateUserDto } from 'src/modules/user/application/dto/create-user.dto';
import { mapArrayToObject } from 'src/utils/mapper';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserPassword(userId: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      select: { password: true },
    });

    return user.password;
  }

  async findUserById(userId: string, config: UserConfig) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      select: config?.select && mapArrayToObject(config.select, true),
      relations: config?.relations && mapArrayToObject(config.relations, true),
    });

    return UserMapper.toDomain(user);
  }

  async findUserByEmail(email: string, config: UserConfig) {
    const user = await this.userRepository.findOneOrFail({
      where: {
        email,
      },
      select: config?.select && mapArrayToObject(config.select, true),
      relations: config?.relations && mapArrayToObject(config.relations, true),
    });

    if (!user) throw new Error('User not found');

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(
      this.userRepository.create({ ...createUserDto }),
    );

    return UserMapper.toDomain(user);
  }

  async userExists(email: string) {
    return await this.userRepository.exist({ where: { email } });
  }
}
