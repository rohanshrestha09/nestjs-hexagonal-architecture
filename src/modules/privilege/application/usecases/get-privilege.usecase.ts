import { Injectable } from '@nestjs/common';
import { PrivilegeDAO } from '../dao/privilege.dao';
import { QueryPrivilegeDto } from '../dto/query-privilege.dto';

@Injectable()
export class GetPrivilegeUseCase {
  constructor(private privilegeDAO: PrivilegeDAO) {}

  async getPrivilegeById(id: number) {
    return await this.privilegeDAO.findPrivilegeById(id);
  }

  async getPrivilegeByName(name: string) {
    return await this.privilegeDAO.findPrivilegeByName(name);
  }

  async getAllPrivileges(queryPrivilegeDto: QueryPrivilegeDto) {
    return await this.privilegeDAO.findAllPrivileges(queryPrivilegeDto);
  }

  async getAllPrivilegeByNames(names: string[]) {
    return await this.privilegeDAO.findAllPrivilegeByNames(names);
  }
}
