import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import MySQLSequelizePrivilegeEntity from './privilege-mysql-sequelize.entity';
import {
  PrivilegeRepository,
  QueryPrivilegeDto,
} from 'src/core/ports/out/privilege/privilege-repository.port';
import { Privilege } from 'src/core/domain/privilege/privilege.domain';

@Injectable()
export class MySQLSequelizePrivilegeRepositoryImpl
  implements PrivilegeRepository
{
  constructor(
    @InjectModel(MySQLSequelizePrivilegeEntity)
    private privilegeRepository: typeof MySQLSequelizePrivilegeEntity,
  ) {}

  async findAllPrivileges({ page, size, sort, order }: QueryPrivilegeDto) {
    const privileges = await this.privilegeRepository.findAll({
      offset: (page - 1) * size,
      limit: size,
      order: [[sort, order]],
    });

    const count = await this.privilegeRepository.count();

    return [Privilege.toDomains(privileges), count] as [Privilege[], number];
  }

  async findPrivilegeById(id: number) {
    const privilege = await this.privilegeRepository.findByPk(id, {
      rejectOnEmpty: true,
    });

    return Privilege.toDomain(privilege);
  }

  async findPrivilegeByName(name: string) {
    const privilege = await this.privilegeRepository.findOne({
      where: { name },
      rejectOnEmpty: true,
    });

    return Privilege.toDomain(privilege);
  }

  async findAllPrivilegeByNames(names?: string[]) {
    const privileges = await this.privilegeRepository.findAll({
      where: { name: { [Op.in]: names } },
    });

    return Privilege.toDomains(privileges);
  }

  async createPrivilege(privilege: Privilege) {
    return Privilege.toDomain(
      await this.privilegeRepository.create({
        ...privilege,
      }),
    );
  }
}
