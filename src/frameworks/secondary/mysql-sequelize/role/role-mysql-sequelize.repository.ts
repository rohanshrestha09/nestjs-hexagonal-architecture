import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import MySQLSequelizeRoleEntity from './role-mysql-sequelize.entity';
import { RoleRepository } from 'src/core/ports/out/role/role-repository.port';
import { Role } from 'src/core/domain/role/role.domain';
import { ROLE } from 'src/common/enums/role.enum';

@Injectable()
export class MySQLSequelizeRoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectModel(MySQLSequelizeRoleEntity)
    private roleRepository: typeof MySQLSequelizeRoleEntity,
  ) {}

  async findRoleByName(name: ROLE) {
    const role = await this.roleRepository.findOne({
      where: { name },
      rejectOnEmpty: true,
    });

    return Role.toDomain(role);
  }
}
