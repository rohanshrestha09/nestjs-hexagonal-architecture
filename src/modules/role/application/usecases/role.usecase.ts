import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../ports/out/role-repository.port';
import { RoleUseCase } from '../../ports/in/role-usecase.port';
import { ROLE } from '../../infrastructure/enums/role.enum';

@Injectable()
export class RoleUseCaseImpl implements RoleUseCase {
  constructor(private roleRepository: RoleRepository) {}

  async getRoleByName(name: ROLE) {
    return await this.roleRepository.findRoleByName(name);
  }
}
