import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MySQLSequelizeUserEntity } from './user-mysql-sequelize.entity';
import { UserRepositoryPort } from 'src/modules/user/ports/out/user-repository.port';
import { User } from 'src/modules/user/domain/user.domain';

@Injectable()
export class MySQLSequelizeUserRepository extends UserRepositoryPort {
  constructor(
    @InjectModel(MySQLSequelizeUserEntity)
    private userRepository: typeof MySQLSequelizeUserEntity,
  ) {
    super();
  }

  async findUserPassword(userId: string) {
    const user = await this.userRepository.findByPk(userId, {
      attributes: ['password'],
      rejectOnEmpty: true,
    });

    return user.password;
  }

  async findUserById(userId: string) {
    const user = await this.userRepository.findByPk(userId, {
      include: ['role', 'privileges'],
      rejectOnEmpty: true,
    });

    return User.toDomain(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      include: ['role', 'privileges'],
      rejectOnEmpty: true,
    });

    return User.toDomain(user);
  }

  async createUser(user: User) {
    return User.toDomain(await this.userRepository.create({ ...user }));
  }

  async userExists(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return !!user;
  }
}
