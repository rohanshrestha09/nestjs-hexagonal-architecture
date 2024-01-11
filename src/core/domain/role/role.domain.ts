import { z } from 'zod';
import { plainToInstance } from 'class-transformer';
import { User } from '../user/user.domain';
import { CreateRoleProps, UpdateRoleProps } from './role.types';
import { ROLE } from 'src/common/enums/role.enum';

export class Role {
  id: number;
  name: ROLE;
  createdAt: Date;
  updatedAt: Date;
  users: User[];

  public static create(createRoleProps: CreateRoleProps) {
    const createRoleValidator = z.object({
      name: z.nativeEnum(ROLE),
    });

    return plainToInstance(Role, createRoleValidator.parse(createRoleProps), {
      exposeUnsetFields: false,
    });
  }

  public static update(updateRoleProps: UpdateRoleProps) {
    const updateRoleValidator = z.object({
      name: z.nativeEnum(ROLE).optional(),
    });

    return plainToInstance(Role, updateRoleValidator.parse(updateRoleProps), {
      exposeUnsetFields: false,
    });
  }

  public static toDomain(role: Role) {
    return plainToInstance(Role, role, { exposeUnsetFields: false });
  }

  public static toDomains(roles: Role[]) {
    return roles?.map((role) => this.toDomain(role));
  }
}
