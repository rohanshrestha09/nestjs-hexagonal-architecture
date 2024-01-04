import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MySQLTypeORMUserEntity } from './user-mysql-typeorm.entity';
import { UserRepository } from 'src/modules/user/ports/out/user-repository.port';
import { User } from 'src/modules/user/domain/user.domain';

@Injectable()
export class MySQLTypeORMUserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(MySQLTypeORMUserEntity)
    private userRepository: Repository<MySQLTypeORMUserEntity>,
  ) {}

  async findUserPassword(userId: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      select: { password: true },
    });

    return user.password;
  }

  async findUserById(userId: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: {
        role: true,
      },
    });

    return User.toDomain(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneOrFail({
      where: {
        email,
      },
      relations: {
        role: true,
      },
    });

    return User.toDomain(user);
  }

  async createUser(user: User) {
    return User.toDomain(
      await this.userRepository.save(this.userRepository.create({ ...user })),
    );
  }

  async userExists(email: string) {
    return await this.userRepository.exist({ where: { email } });
  }
}
