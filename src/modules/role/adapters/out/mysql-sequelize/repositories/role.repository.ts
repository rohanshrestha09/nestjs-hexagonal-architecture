import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleEntity } from '../entities/role.entity';
import { RoleRepositoryPort } from 'src/modules/role/ports/out/role-repository.port';
import { RoleMapper } from 'src/modules/role/infrastructure/mapper/role.mapper';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@Injectable()
export class RoleRepository extends RoleRepositoryPort {
  constructor(
    @InjectModel(RoleEntity)
    private roleRepository: typeof RoleEntity,
  ) {
    super();
  }

  async findRoleByName(name: ROLE) {
    const role = await this.roleRepository.findOne({
      where: { name },
      rejectOnEmpty: true,
    });

    return RoleMapper.toDomain(role);
  }
}
