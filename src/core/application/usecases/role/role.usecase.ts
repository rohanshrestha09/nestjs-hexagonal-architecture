import { Injectable } from '@nestjs/common';
import { RoleUseCase } from 'src/core/ports/in/role/role-usecase.port';
import { RoleRepository } from 'src/core/ports/out/role/role-repository.port';
import { ROLE } from 'src/common/enums/role.enum';

@Injectable()
export class RoleUseCaseImpl implements RoleUseCase {
  constructor(private roleRepository: RoleRepository) {}

  async getRoleByName(name: ROLE) {
    return await this.roleRepository.findRoleByName(name);
  }
}
