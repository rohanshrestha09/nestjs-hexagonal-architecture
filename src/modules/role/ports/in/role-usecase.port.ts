import { Role } from '../../domain/role.domain';
import { ROLE } from '../../infrastructure/enums/role.enum';

export abstract class RoleUseCasePort {
  abstract getRoleByName(name: ROLE): Promise<Role>;
}
