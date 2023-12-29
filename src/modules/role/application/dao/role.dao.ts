import { Role } from '../../domain/role.domain';

export abstract class RoleDAO {
  abstract findRoleByName(name: string): Promise<Role>;
}
