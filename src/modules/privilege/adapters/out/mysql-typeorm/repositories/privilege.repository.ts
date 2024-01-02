import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PrivilegeEntity } from '../entites/privilege.entity';
import { PrivilegeRepositoryPort } from 'src/modules/privilege/ports/out/privilege-repository.port';
import { QueryPrivilegeDto } from 'src/modules/privilege/application/dto/query-privilege.dto';
import { CreatePrivilegeDto } from 'src/modules/privilege/application/dto/create-privilege.dto';
import { PrivilegeMapper } from 'src/modules/privilege/infrastructure/mapper/privilege.mapper';

@Injectable()
export class PrivilegeRepository extends PrivilegeRepositoryPort {
  constructor(
    @InjectRepository(PrivilegeEntity)
    private privilegeRepository: Repository<PrivilegeEntity>,
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

    return [PrivilegeMapper.toDomains(privileges), count] as [
      ReturnType<(typeof PrivilegeMapper)['toDomains']>,
      number,
    ];
  }

  async findPrivilegeById(id: number) {
    const privilege = await this.privilegeRepository.findOneOrFail({
      where: { id },
    });

    return PrivilegeMapper.toDomain(privilege);
  }

  async findPrivilegeByName(name: string) {
    const privilege = await this.privilegeRepository.findOneOrFail({
      where: { name },
    });

    return PrivilegeMapper.toDomain(privilege);
  }

  async findAllPrivilegeByNames(names?: string[]) {
    const privileges = await this.privilegeRepository.find({
      where: { name: In(names) },
    });

    return PrivilegeMapper.toDomains(privileges);
  }

  async createPrivilege(createPrivilegeDto: CreatePrivilegeDto) {
    const privilege = await this.privilegeRepository.save(
      this.privilegeRepository.create({ ...createPrivilegeDto }),
    );

    return PrivilegeMapper.toDomain(privilege);
  }
}
