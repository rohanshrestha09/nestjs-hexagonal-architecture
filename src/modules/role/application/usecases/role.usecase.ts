import { Injectable } from '@nestjs/common';
import { RoleRepositoryPort } from '../../ports/out/role-repository.port';
import { RoleUseCasePort } from '../../ports/in/role-usecase.port';
import { ROLE } from '../../infrastructure/enums/role.enum';

@Injectable()
export class RoleUseCase implements RoleUseCasePort {
  constructor(private roleRepositoryPort: RoleRepositoryPort) {}

  async getRoleByName(name: ROLE) {
    return await this.roleRepositoryPort.findRoleByName(name);
  }
}
