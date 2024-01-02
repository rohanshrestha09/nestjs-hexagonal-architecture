import { Injectable } from '@nestjs/common';
import { CreatePrivilegeDto } from '../dto/create-privilege.dto';
import { PrivilegeRepositoryPort } from '../../ports/out/privilege-repository.port';

@Injectable()
export class CreatePrivilegeUseCase {
  constructor(private privilegeRepositoryPort: PrivilegeRepositoryPort) {}

  async createPrivilege(createPrivilegeDto: CreatePrivilegeDto) {
    return await this.privilegeRepositoryPort.createPrivilege(
      createPrivilegeDto,
    );
  }
}
