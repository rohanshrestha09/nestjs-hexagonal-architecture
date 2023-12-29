import { Injectable } from '@nestjs/common';
import { PrivilegeDAO } from '../../application/dao/privilege.dao';
import { PrivilegeRepository } from './mysql-typeorm/repositories/privilege.repository';
import { CreatePrivilegeDto } from '../../application/dto/create-privilege.dto';
import { QueryPrivilegeDto } from '../../application/dto/query-privilege.dto';
import { PrivilegeMapper } from '../../infrastructure/mapper/privilege.mapper';
// import { In } from 'typeorm';

@Injectable()
export class PrivilegeDAOAdapter implements PrivilegeDAO {
  constructor(private privilegeRepository: PrivilegeRepository) {}

  async findPrivilegeById(id: number) {
    const privilege = await this.privilegeRepository.findOneOrThrow({
      where: { id },
    });

    return PrivilegeMapper.toDomain(privilege);
  }

  async findPrivilegeByName(name: string) {
    const privilege = await this.privilegeRepository.findOneOrThrow({
      where: { name },
    });

    return PrivilegeMapper.toDomain(privilege);
  }

  async findAllPrivileges({ page, size, sort, order }: QueryPrivilegeDto) {
    const privileges = await this.privilegeRepository.findMany({
      skip: (page - 1) * size,
      take: size,
      order: {
        [sort]: order,
      },
    });

    const count = await this.privilegeRepository.count();

    return [PrivilegeMapper.toDomains(privileges), count] as [
      ReturnType<(typeof PrivilegeMapper)['toDomains']>,
      number,
    ];
  }

  async findAllPrivilegeByNames() {
    const privileges = await this.privilegeRepository.findMany({
      // where: { name: In(names) },
    });

    return PrivilegeMapper.toDomains(privileges);
  }

  async createPrivilege(createPrivilegeDto: CreatePrivilegeDto) {
    const privilege = await this.privilegeRepository.create(createPrivilegeDto);

    return PrivilegeMapper.toDomain(privilege);
  }
}
