import { Privilege } from 'src/core/domain/privilege/privilege.domain';

export type QueryPrivilegeDto = {
  page: number;
  size: number;
  sort: string;
  order: 'ASC' | 'DESC';
};

export abstract class PrivilegeRepository {
  abstract findPrivilegeById(id: number): Promise<Privilege>;
  abstract findPrivilegeByName(name: string): Promise<Privilege>;
  abstract findAllPrivileges(
    queryPrivilegeDto: QueryPrivilegeDto,
  ): Promise<[Privilege[], number]>;
  abstract findAllPrivilegeByNames(names?: string[]): Promise<Privilege[]>;
  abstract createPrivilege(privilege: Privilege): Promise<Privilege>;
}
