import { Injectable } from '@nestjs/common';
import { UserConfig, UserDAO } from '../../application/dao/user.dao';
import { UserRepository } from './mysql-typeorm/repositories/user.repository';
import { User } from '../../domain/user.domain';
import { CreateUserDto } from '../../application/dto/create-user.dto';

@Injectable()
export class UserDAOAdapter implements UserDAO {
  constructor(private userRepository: UserRepository) {}

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

    return new User(user);
  }

  async findUserByEmail(email: string, { select, relations }: UserConfig) {
    const user = await this.userRepository.findOne({
      where: { email },
      select,
      relations,
    });

    return user ? new User(user) : null;
  }

  async createUser({ roleId, ...data }: CreateUserDto) {
    const user = await this.userRepository.create({
      ...data,
      role: { id: roleId },
    });

    return new User(user);
  }
}
