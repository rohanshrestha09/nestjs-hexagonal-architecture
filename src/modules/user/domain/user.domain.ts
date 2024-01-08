import { z } from 'zod';
import { Exclude, plainToInstance } from 'class-transformer';
import { Privilege } from 'src/modules/privilege/domain/privilege.domain';
import { Blog } from 'src/modules/blog/domain/blog.domain';
import { Role } from 'src/modules/role/domain/role.domain';
import { Course } from 'src/modules/course/domain/course.domain';
import { CreateUserProps, UpdateUserProps } from './user.types';

export class User {
  id: string;
  name: string;
  email: string;
  phone: string;

  @Exclude()
  password: string;

  createdAt: Date;
  updatedAt: Date;
  roleId: number;
  role: Role;
  privileges: Privilege[];
  blogs: Blog[];
  courses: Course[];

  public static create(createUserProps: CreateUserProps) {
    const createUserValidator = z.union([
      z.object({
        name: z.string(),
        phone: z.string(),
        password: z.string(),
        roleId: z.number(),
      }),
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        roleId: z.number(),
      }),
    ]);

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
    return plainToInstance(
      User,
      { ...user, password: undefined },
      { exposeUnsetFields: false },
    );
  }

  public static toDomains(users: User[]) {
    return users?.map((user) => this.toDomain(user));
  }
}
