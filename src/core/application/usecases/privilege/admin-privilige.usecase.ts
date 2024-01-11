import { Injectable } from '@nestjs/common';
import { Privilege } from 'src/core/domain/privilege/privilege.domain';
import { AdminPrivilegeUseCase } from 'src/core/ports/in/privilege/admin-privilege-usecase.port';
import { QueryPrivilegeDto } from 'src/core/ports/in/privilege/privilege-usecase.types';
import { PrivilegeRepository } from 'src/core/ports/out/privilege/privilege-repository.port';

@Injectable()
export class AdminPrivilegeUseCaseImpl implements AdminPrivilegeUseCase {
  constructor(private readonly privilegeRepository: PrivilegeRepository) {}

  async getPrivilegeById(id: number) {
    return await this.privilegeRepository.findPrivilegeById(id);
  }

  async getPrivilegeByName(name: string) {
    return await this.privilegeRepository.findPrivilegeByName(name);
  }

  async getAllPrivileges(queryPrivilegeDto: QueryPrivilegeDto) {
    return await this.privilegeRepository.findAllPrivileges(queryPrivilegeDto);
  }

  async getAllPrivilegeByNames(names: string[]) {
    return await this.privilegeRepository.findAllPrivilegeByNames(names);
  }

  async createPrivilege(privilege: Privilege) {
    return await this.privilegeRepository.createPrivilege(privilege);
  }
}
