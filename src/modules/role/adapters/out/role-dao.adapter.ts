import { Injectable } from '@nestjs/common';
import { RoleDAO } from '../../application/dao/role.dao';
import { RoleRepository } from './mysql-typeorm/repositories/role.repository';
import { ROLE } from '../../infrastructure/enums/role.enum';
import { Role } from '../../domain/role.domain';

@Injectable()
export class RoleDAOAdapter implements RoleDAO {
  constructor(private roleRepository: RoleRepository) {}

  async findRoleByName(name: ROLE) {
    const role = await this.roleRepository.findOneOrThrow({
      where: { name },
    });

    return new Role(role);
  }
}
