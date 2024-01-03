import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { MySQLSequelizePrivilegeEntity } from './privilege-mysql-sequelize.entity';
import { PrivilegeRepositoryPort } from 'src/modules/privilege/ports/out/privilege-repository.port';
import { QueryPrivilegeDto } from 'src/modules/privilege/application/dto/query-privilege.dto';
import { Privilege } from 'src/modules/privilege/domain/privilege.domain';

@Injectable()
export class PrivilegeRepository extends PrivilegeRepositoryPort {
  constructor(
    @InjectModel(MySQLSequelizePrivilegeEntity)
    private privilegeRepository: typeof MySQLSequelizePrivilegeEntity,
  ) {
    super();
  }

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
