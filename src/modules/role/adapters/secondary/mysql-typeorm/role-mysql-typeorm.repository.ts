import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MySQLTypeORMRoleEntity } from './role-mysql-typeorm.entity';
import { RoleRepositoryPort } from 'src/modules/role/ports/out/role-repository.port';
import { Role } from 'src/modules/role/domain/role.domain';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@Injectable()
export class MySQLTypeORMRoleRepository extends RoleRepositoryPort {
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
