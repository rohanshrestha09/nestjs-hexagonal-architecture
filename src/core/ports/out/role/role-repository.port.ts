import { Role } from 'src/core/domain/role/role.domain';

export abstract class RoleRepository {
  abstract findRoleByName(name: string): Promise<Role>;
}
