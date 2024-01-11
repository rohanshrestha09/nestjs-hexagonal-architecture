import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from 'src/core/ports/out/role/role-repository.port';
import { Repository } from 'typeorm';
import { MySQLTypeORMRoleEntity } from './role-mysql-typeorm.entity';
import { Role } from 'src/core/domain/role/role.domain';
import { ROLE } from 'src/common/enums/role.enum';

@Injectable()
export class MySQLTypeORMRoleRepositoryImpl extends RoleRepository {
  constructor(
    @InjectRepository(MySQLTypeORMRoleEntity)
    private roleRepository: Repository<MySQLTypeORMRoleEntity>,
  ) {
    super();
  }

  async findRoleByName(name: ROLE) {
    const role = await this.roleRepository.findOneOrFail({ where: { name } });

    return Role.toDomain(role);
  }
}
