import { CreateUserDto } from '../../application/dto/create-user.dto';
import { User } from '../../domain/user.domain';

export type UserConfig = {
  select?: (keyof User)[];
  relations?: ['role'];
};

export abstract class UserRepositoryPort {
  abstract findUserPassword(userId: string): Promise<string>;
  abstract findUserById(userId: string, config: UserConfig): Promise<User>;
  abstract findUserByEmail(
    email: string,
    config: UserConfig,
  ): Promise<User | null>;
  abstract createUser(createUserDto: CreateUserDto): Promise<User>;
  abstract userExists(email: string): Promise<boolean>;
}
