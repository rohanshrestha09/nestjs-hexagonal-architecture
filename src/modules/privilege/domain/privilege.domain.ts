import { z } from 'zod';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/modules/user/domain/user.domain';
import { CreatePrivilegeProps, UpdatePrivilegeProps } from './privilege.types';

export class Privilege {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];

  public static create(createPrivilegeProps: CreatePrivilegeProps) {
    const createPrivilegeValidator = z.object({
      name: z.string(),
    });

    return plainToInstance(
      Privilege,
      createPrivilegeValidator.parse(createPrivilegeProps),
      {
        exposeUnsetFields: false,
      },
    );
  }

  public static update(updatePrivilegeProps: UpdatePrivilegeProps) {
    const updatePrivilegeValidator = z.object({
      name: z.string().optional(),
    });

    return plainToInstance(
      Privilege,
      updatePrivilegeValidator.parse(updatePrivilegeProps),
      {
        exposeUnsetFields: false,
      },
    );
  }

  public static toDomain(privilege: Privilege) {
    return plainToInstance(Privilege, privilege, { exposeUnsetFields: false });
  }

  public static toDomains(privileges: Privilege[]) {
    return privileges?.map((privilege) => this.toDomain(privilege));
  }
}
