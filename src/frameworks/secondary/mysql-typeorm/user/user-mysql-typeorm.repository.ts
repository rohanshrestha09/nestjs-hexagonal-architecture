import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/core/ports/out/user/user-repository.port';
import { Repository } from 'typeorm';
import { MySQLTypeORMUserEntity } from './user-mysql-typeorm.entity';
import { User } from 'src/core/domain/user/user.domain';

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
        privileges: true,
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
        privileges: true,
      },
    });

    return User.toDomain(user);
  }

  async findUserByPhone(phone: string) {
    const user = await this.userRepository.findOneOrFail({
      where: {
        phone,
      },
      relations: {
        role: true,
        privileges: true,
      },
    });

    return User.toDomain(user);
  }

  async createUser(user: User) {
    return User.toDomain(
      await this.userRepository.save(this.userRepository.create({ ...user })),
    );
  }

  async userExistsByEmail(email: string) {
    return await this.userRepository.exist({ where: { email } });
  }

  async userExistsByPhone(phone: string) {
    return await this.userRepository.exist({ where: { phone } });
  }

  async changeUserPassword(userId: string, password: string) {
    await this.userRepository.update({ id: userId }, { password });
  }
}
