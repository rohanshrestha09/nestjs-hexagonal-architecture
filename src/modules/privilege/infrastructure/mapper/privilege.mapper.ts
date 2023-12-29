import { Privilege } from '../../domain/privilege.domain';

export class PrivilegeMapper {
  public static toDomain(privilege: Privilege): Privilege {
    return new Privilege(privilege);
  }

  public static toDomains(privileges: Privilege[]): Privilege[] {
    return privileges?.map((privilege) => new Privilege(privilege));
  }
}
