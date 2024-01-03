import { Injectable } from '@nestjs/common';
import { PrivilegeRepositoryPort } from '../../ports/out/privilege-repository.port';
import { Privilege } from '../../domain/privilege.domain';

@Injectable()
export class CreatePrivilegeUseCase {
  constructor(private privilegeRepositoryPort: PrivilegeRepositoryPort) {}

  async createPrivilege(privilege: Privilege) {
    return await this.privilegeRepositoryPort.createPrivilege(privilege);
  }
}
