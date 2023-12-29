import { Privilege } from '../../domain/privilege.domain';
import { CreatePrivilegeDto } from '../dto/create-privilege.dto';
import { QueryPrivilegeDto } from '../dto/query-privilege.dto';

export abstract class PrivilegeDAO {
  abstract findPrivilegeById(id: number): Promise<Privilege>;
  abstract findPrivilegeByName(name: string): Promise<Privilege>;
  abstract findAllPrivileges(
    queryPrivilegeDto: QueryPrivilegeDto,
  ): Promise<[Privilege[], number]>;
  abstract findAllPrivilegeByNames(names?: string[]): Promise<Privilege[]>;
  abstract createPrivilege(
    createPrivilegeDto: CreatePrivilegeDto,
  ): Promise<Privilege>;
}
