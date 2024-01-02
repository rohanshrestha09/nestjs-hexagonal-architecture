import { Injectable } from '@nestjs/common';
import { UserConfig, UserDAO } from '../../application/dao/user.dao';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UserMapper } from '../../infrastructure/mapper/user.mapper';
import { BaseRepository } from 'src/base/repository/base.repository';
import { User } from '../../domain/user.domain';

@Injectable()
export class UserDAOAdapter implements UserDAO {
  constructor(private userRepository: BaseRepository<User>) {}

  async findUserPassword(userId: string) {
    const user = await this.userRepository.findOneOrThrow({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    return user.password;
  }

  async findUserById(userId: string, { select, relations }: UserConfig) {
    const user = await this.userRepository.findOneOrThrow({
      where: { id: userId },
      select,
      relations,
    });

    return UserMapper.toDomain(user);
  }

  async findUserByEmail(email: string, { select, relations }: UserConfig) {
    const user = await this.userRepository.findOne({
      where: { email },
      select,
      relations,
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      ...createUserDto,
    });

    return UserMapper.toDomain(user);
  }
}
