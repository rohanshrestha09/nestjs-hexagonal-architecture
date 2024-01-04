import { Injectable } from '@nestjs/common';
import { Privilege } from '../../domain/privilege.domain';
import { PrivilegeUseCasePort } from '../../ports/in/privilege-usecase.port';
import { PrivilegeRepositoryPort } from '../../ports/out/privilege-repository.port';
import { QueryPrivilegeDto } from '../dto/query-privilege.dto';

@Injectable()
export class PrivilegeUseCase implements PrivilegeUseCasePort {
  constructor(
    private readonly privilegeRepositoryPort: PrivilegeRepositoryPort,
  ) {}

  async getPrivilegeById(id: number) {
    return await this.privilegeRepositoryPort.findPrivilegeById(id);
  }

  async getPrivilegeByName(name: string) {
    return await this.privilegeRepositoryPort.findPrivilegeByName(name);
  }

  async getAllPrivileges(queryPrivilegeDto: QueryPrivilegeDto) {
    return await this.privilegeRepositoryPort.findAllPrivileges(
      queryPrivilegeDto,
    );
  }

  async getAllPrivilegeByNames(names: string[]) {
    return await this.privilegeRepositoryPort.findAllPrivilegeByNames(names);
  }

  async createPrivilege(privilege: Privilege) {
    return await this.privilegeRepositoryPort.createPrivilege(privilege);
  }
}
