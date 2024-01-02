import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { RoleRepositoryPort } from 'src/modules/role/ports/out/role-repository.port';
import { RoleMapper } from 'src/modules/role/infrastructure/mapper/role.mapper';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@Injectable()
export class RoleRepository extends RoleRepositoryPort {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {
    super();
  }

  async findRoleByName(name: ROLE) {
    const role = await this.roleRepository.findOneOrFail({ where: { name } });

    return RoleMapper.toDomain(role);
  }
}
