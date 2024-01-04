import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MySQLSequelizeRoleEntity } from './role-mysql-sequelize.entity';
import { RoleRepository } from 'src/modules/role/ports/out/role-repository.port';
import { Role } from 'src/modules/role/domain/role.domain';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@Injectable()
export class MySQLSequelizeRoleRepositoryImpl extends RoleRepository {
  constructor(
    @InjectModel(MySQLSequelizeRoleEntity)
    private roleRepository: typeof MySQLSequelizeRoleEntity,
  ) {
    super();
  }

  async findRoleByName(name: ROLE) {
    const role = await this.roleRepository.findOne({
      where: { name },
      rejectOnEmpty: true,
    });

    return Role.toDomain(role);
  }
}
