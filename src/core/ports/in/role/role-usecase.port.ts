import { Role } from 'src/core/domain/role/role.domain';
import { ROLE } from 'src/common/enums/role.enum';

export abstract class RoleUseCase {
  abstract getRoleByName(name: ROLE): Promise<Role>;
}
