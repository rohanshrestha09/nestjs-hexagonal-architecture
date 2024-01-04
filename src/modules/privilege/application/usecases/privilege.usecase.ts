import { Injectable } from '@nestjs/common';
import { Privilege } from '../../domain/privilege.domain';
import { PrivilegeUseCase } from '../../ports/in/privilege-usecase.port';
import { PrivilegeRepository } from '../../ports/out/privilege-repository.port';
import { QueryPrivilegeDto } from '../dto/query-privilege.dto';

@Injectable()
export class PrivilegeUseCaseImpl implements PrivilegeUseCase {
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
