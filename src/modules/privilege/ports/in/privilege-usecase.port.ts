import { QueryPrivilegeDto } from '../../application/dto/query-privilege.dto';
import { Privilege } from '../../domain/privilege.domain';

export abstract class PrivilegeUseCasePort {
  abstract getPrivilegeById(id: number): Promise<Privilege>;
  abstract getPrivilegeByName(name: string): Promise<Privilege>;
  abstract getAllPrivileges(
    queryPrivilegeDto: QueryPrivilegeDto,
  ): Promise<[Privilege[], number]>;
  abstract getAllPrivilegeByNames(names: string[]): Promise<Privilege[]>;
  abstract createPrivilege(privilege: Privilege): Promise<Privilege>;
}
