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
    return plainToInstance(Privilege, createPrivilegeProps, {
      exposeUnsetFields: false,
    });
  }

  public static update(updatePrivilegeProps: UpdatePrivilegeProps) {
    return plainToInstance(Privilege, updatePrivilegeProps, {
      exposeUnsetFields: false,
    });
  }

  public static toDomain(privilege: Privilege) {
    return plainToInstance(Privilege, privilege, { exposeUnsetFields: false });
  }

  public static toDomains(privileges: Privilege[]) {
    return privileges?.map((privilege) => this.toDomain(privilege));
  }
}
