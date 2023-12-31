import { Injectable } from '@nestjs/common';
import { RoleDAO } from '../../application/dao/role.dao';
import { RoleMapper } from '../../infrastructure/mapper/role.mapper';
import { ROLE } from '../../infrastructure/enums/role.enum';
import { BaseRepository } from 'src/base/repository/base.repository';
import { Role } from '../../domain/role.domain';

@Injectable()
export class RoleDAOAdapter implements RoleDAO {
  constructor(private roleRepository: BaseRepository<Role>) {}

  async findRoleByName(name: ROLE) {
    const role = await this.roleRepository.findOneOrThrow({
      where: { name },
    });

    return RoleMapper.toDomain(role);
  }
}
