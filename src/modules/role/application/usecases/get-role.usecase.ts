import { Injectable } from '@nestjs/common';
import { RoleDAO } from '../dao/role.dao';
import { ROLE } from '../../infrastructure/enums/role.enum';

@Injectable()
export class GetRoleUseCase {
  constructor(private roleDAO: RoleDAO) {}

  async getRoleByName(name: ROLE) {
    return await this.roleDAO.findRoleByName(name);
  }
}
