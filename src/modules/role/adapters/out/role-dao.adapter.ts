import { Injectable } from '@nestjs/common';
import { RoleDAO } from '../../application/dao/role.dao';
import { RoleRepository } from './mysql-typeorm/repositories/role.repository';
import { RoleMapper } from '../../infrastructure/mapper/role.mapper';
import { ROLE } from '../../infrastructure/enums/role.enum';

@Injectable()
export class RoleDAOAdapter implements RoleDAO {
  constructor(private roleRepository: RoleRepository) {}

  async findRoleByName(name: ROLE) {
    const role = await this.roleRepository.findOneOrThrow({
      where: { name },
    });

    return RoleMapper.toDomain(role);
  }
}
