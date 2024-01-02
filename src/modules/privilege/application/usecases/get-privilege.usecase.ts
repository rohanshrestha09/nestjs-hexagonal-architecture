import { Injectable } from '@nestjs/common';
import { QueryPrivilegeDto } from '../dto/query-privilege.dto';
import { PrivilegeRepositoryPort } from '../../ports/out/privilege-repository.port';

@Injectable()
export class GetPrivilegeUseCase {
  constructor(private privilegeRepositoryPort: PrivilegeRepositoryPort) {}

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
}
