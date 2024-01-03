import { plainToInstance } from 'class-transformer';
import { User } from 'src/modules/user/domain/user.domain';
import { CreateRoleProps, UpdateRoleProps } from './role.types';
import { ROLE } from '../infrastructure/enums/role.enum';

export class Role {
  id: number;
  name: ROLE;
  createdAt: Date;
  updatedAt: Date;
  users: User[];

  public static create(createRoleProps: CreateRoleProps) {
    return plainToInstance(Role, createRoleProps, { exposeUnsetFields: false });
  }

  public static update(updateRoleProps: UpdateRoleProps) {
    return plainToInstance(Role, updateRoleProps, { exposeUnsetFields: false });
  }

  public static toDomain(role: Role) {
    return plainToInstance(Role, role, { exposeUnsetFields: false });
  }

  public static toDomains(roles: Role[]) {
    return roles?.map((role) => this.toDomain(role));
  }
}
