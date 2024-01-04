import { Role } from '../../domain/role.domain';

export abstract class RoleRepository {
  abstract findRoleByName(name: string): Promise<Role>;
}
