import { Role } from '../../domain/role.domain';

export class RoleMapper {
  public static toDomain(role: Role): Role {
    return new Role(role);
  }

  public static toDomains(roles: Role[]): Role[] {
    return roles?.map((role) => this.toDomain(role));
  }
}
