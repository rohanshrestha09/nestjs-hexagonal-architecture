import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PrivilegeRepository,
  QueryPrivilegeDto,
} from 'src/core/ports/out/privilege/privilege-repository.port';
import { In, Repository } from 'typeorm';
import { MySQLTypeORMPrivilegeEntity } from './privilege-mysql-typeorm.entity';
import { Privilege } from 'src/core/domain/privilege/privilege.domain';

@Injectable()
export class MySQLTypeORMPrivilegeRepositoryImpl extends PrivilegeRepository {
  constructor(
    @InjectRepository(MySQLTypeORMPrivilegeEntity)
    private privilegeRepository: Repository<MySQLTypeORMPrivilegeEntity>,
  ) {
    super();
  }

  async findAllPrivileges({ page, size, sort, order }: QueryPrivilegeDto) {
    const privileges = await this.privilegeRepository.find({
      skip: (page - 1) * size,
      take: size,
      order: {
        [sort]: order,
      },
    });

    const count = await this.privilegeRepository.count();

    return [Privilege.toDomains(privileges), count] as [Privilege[], number];
  }

  async findPrivilegeById(id: number) {
    const privilege = await this.privilegeRepository.findOneOrFail({
      where: { id },
    });

    return Privilege.toDomain(privilege);
  }

  async findPrivilegeByName(name: string) {
    const privilege = await this.privilegeRepository.findOneOrFail({
      where: { name },
    });

    return Privilege.toDomain(privilege);
  }

  async findAllPrivilegeByNames(names?: string[]) {
    const privileges = await this.privilegeRepository.find({
      where: { name: In(names) },
    });

    return Privilege.toDomains(privileges);
  }

  async createPrivilege(privilege: Privilege) {
    return Privilege.toDomain(
      await this.privilegeRepository.save(
        this.privilegeRepository.create({ ...privilege }),
      ),
    );
  }
}
