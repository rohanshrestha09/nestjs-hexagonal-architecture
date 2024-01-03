import { Exclude, plainToInstance } from 'class-transformer';
import { Privilege } from 'src/modules/privilege/domain/privilege.domain';
import { Role } from 'src/modules/role/domain/role.domain';
import { CreateUserProps, UpdateUserProps } from './user.types';

export class User {
  id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  createdAt: Date;
  updatedAt: Date;
  roleId: number;
  role: Role;
  privileges: Privilege[];

  public static create(createUserProps: CreateUserProps) {
    return plainToInstance(User, createUserProps, { exposeUnsetFields: false });
  }

  public static update(updateUserProps: UpdateUserProps) {
    return plainToInstance(User, updateUserProps, { exposeUnsetFields: false });
  }

  public static toDomain(user: User) {
    return plainToInstance(User, user, { exposeUnsetFields: false });
  }

  public static toDomains(users: User[]) {
    return users?.map((user) => this.toDomain(user));
  }
}
