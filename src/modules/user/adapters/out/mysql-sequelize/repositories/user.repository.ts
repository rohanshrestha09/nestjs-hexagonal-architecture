import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../entities/user.entity';
import {
  UserConfig,
  UserRepositoryPort,
} from 'src/modules/user/ports/out/user-repository.port';
import { CreateUserDto } from 'src/modules/user/application/dto/create-user.dto';
import { UserMapper } from 'src/modules/user/infrastructure/mapper/user.mapper';

@Injectable()
export class UserRepository extends UserRepositoryPort {
  constructor(
    @InjectModel(UserEntity)
    private userRepository: typeof UserEntity,
  ) {
    super();
  }

  async findUserPassword(userId: string) {
    const user = await this.userRepository.findByPk(userId, {
      rejectOnEmpty: true,
    });

    return user.password;
  }

  async findUserById(userId: string, config: UserConfig) {
    const user = await this.userRepository.findByPk(userId, {
      attributes: config?.select,
      include: config?.relations,
      rejectOnEmpty: true,
    });

    return UserMapper.toDomain(user);
  }

  async findUserByEmail(email: string, config: UserConfig) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      attributes: config?.select,
      include: config?.relations,
      rejectOnEmpty: true,
    });

    return UserMapper.toDomain(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({ ...createUserDto });

    return UserMapper.toDomain(user);
  }
}
