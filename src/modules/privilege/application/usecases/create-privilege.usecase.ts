import { Injectable } from '@nestjs/common';
import { PrivilegeDAO } from '../dao/privilege.dao';
import { CreatePrivilegeDto } from '../dto/create-privilege.dto';

@Injectable()
export class CreatePrivilegeUseCase {
  constructor(private privilegeDAO: PrivilegeDAO) {}

  async createPrivilege(createPrivilegeDto: CreatePrivilegeDto) {
    return await this.privilegeDAO.createPrivilege(createPrivilegeDto);
  }
}
