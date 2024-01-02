import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PrivilegeEntity } from '../entities/privilege.entity';
import { PrivilegeRepositoryPort } from 'src/modules/privilege/ports/out/privilege-repository.port';
import { QueryPrivilegeDto } from 'src/modules/privilege/application/dto/query-privilege.dto';
import { PrivilegeMapper } from 'src/modules/privilege/infrastructure/mapper/privilege.mapper';
import { CreatePrivilegeDto } from 'src/modules/privilege/application/dto/create-privilege.dto';

@Injectable()
export class PrivilegeRepository extends PrivilegeRepositoryPort {
  constructor(
    @InjectModel(PrivilegeEntity)
    private privilegeRepository: typeof PrivilegeEntity,
  ) {
    super();
  }

  async findAllPrivileges({ page, size, sort, order }: QueryPrivilegeDto) {
    const privileges = await this.privilegeRepository.findAll({
      offset: (page - 1) * size,
      limit: size,
      order: [sort, order],
    });

    const count = await this.privilegeRepository.count();

    return [PrivilegeMapper.toDomains(privileges), count] as [
      ReturnType<(typeof PrivilegeMapper)['toDomains']>,
      number,
    ];
  }

  async findPrivilegeById(id: number) {
    const privilege = await this.privilegeRepository.findByPk(id, {
      rejectOnEmpty: true,
    });

    return PrivilegeMapper.toDomain(privilege);
  }

  async findPrivilegeByName(name: string) {
    const privilege = await this.privilegeRepository.findOne({
      where: { name },
      rejectOnEmpty: true,
    });

    return PrivilegeMapper.toDomain(privilege);
  }

  async findAllPrivilegeByNames(names?: string[]) {
    const privileges = await this.privilegeRepository.findAll({
      where: { name: { [Op.in]: names } },
    });

    return PrivilegeMapper.toDomains(privileges);
  }

  async createPrivilege(createPrivilegeDto: CreatePrivilegeDto) {
    const privilege = await this.privilegeRepository.create({
      ...createPrivilegeDto,
    });

    return PrivilegeMapper.toDomain(privilege);
  }
}
