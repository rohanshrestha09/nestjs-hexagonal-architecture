import { z } from 'zod';
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
    const createUserValidator = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      roleId: z.number(),
    });

    return plainToInstance(User, createUserValidator.parse(createUserProps), {
      exposeUnsetFields: false,
    });
  }

  public static update(updateUserProps: UpdateUserProps) {
    const updateUserValidator = z.object({
      name: z.string().optional(),
      password: z.string().optional(),
    });

    return plainToInstance(User, updateUserValidator.parse(updateUserProps), {
      exposeUnsetFields: false,
    });
  }

  public static toDomain(user: User) {
    return plainToInstance(User, user, { exposeUnsetFields: false });
  }

  public static toDomains(users: User[]) {
    return users?.map((user) => this.toDomain(user));
  }
}
