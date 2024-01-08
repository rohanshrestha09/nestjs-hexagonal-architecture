import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MySQLSequelizeUserEntity } from './user-mysql-sequelize.entity';
import { UserRepository } from 'src/modules/user/ports/out/user-repository.port';
import { User } from 'src/modules/user/domain/user.domain';

@Injectable()
export class MySQLSequelizeUserRepositoryImpl extends UserRepository {
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

  async findUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: {
        phone,
      },
      include: ['role', 'privileges'],
      rejectOnEmpty: true,
    });

    return User.toDomain(user);
  }

  async createUser(user: User) {
    return User.toDomain(await this.userRepository.create({ ...user }));
  }

  async userExistsByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return !!user;
  }

  async userExistsByPhone(phone: string) {
    const user = await this.userRepository.findOne({ where: { phone } });

    return !!user;
  }

  async changeUserPassword(userId: string, password: string) {
    await this.userRepository.update({ password }, { where: { id: userId } });
  }
}
