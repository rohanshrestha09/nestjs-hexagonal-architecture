import { Privilege } from '../../domain/privilege.domain';
import { QueryPrivilegeDto } from '../../application/dto/query-privilege.dto';

export abstract class PrivilegeRepositoryPort {
  abstract findPrivilegeById(id: number): Promise<Privilege>;
  abstract findPrivilegeByName(name: string): Promise<Privilege>;
  abstract findAllPrivileges(
    queryPrivilegeDto: QueryPrivilegeDto,
  ): Promise<[Privilege[], number]>;
  abstract findAllPrivilegeByNames(names?: string[]): Promise<Privilege[]>;
  abstract createPrivilege(privilege: Privilege): Promise<Privilege>;
}
