import { Role } from '../../domain/role.domain';

export abstract class RoleRepositoryPort {
  abstract findRoleByName(name: string): Promise<Role>;
}
