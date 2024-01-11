import { Privilege } from 'src/core/domain/privilege/privilege.domain';
import { QueryPrivilegeDto } from './privilege-usecase.types';

export abstract class AdminPrivilegeUseCase {
  abstract getPrivilegeById(id: number): Promise<Privilege>;
  abstract getPrivilegeByName(name: string): Promise<Privilege>;
  abstract getAllPrivileges(
    queryPrivilegeDto: QueryPrivilegeDto,
  ): Promise<[Privilege[], number]>;
  abstract getAllPrivilegeByNames(names: string[]): Promise<Privilege[]>;
  abstract createPrivilege(privilege: Privilege): Promise<Privilege>;
}
