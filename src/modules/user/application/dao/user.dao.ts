import { User } from '../../domain/user.domain';
import { CreateUserDto } from '../dto/create-user.dto';

export type UserConfig = {
  select?: {
    password: boolean;
  };
  relations?: {
    role?: boolean;
    todos?: boolean;
  };
};

export abstract class UserDAO {
  abstract findUserPassword(userId: string): Promise<string>;
  abstract findUserById(userId: string, config: UserConfig): Promise<User>;
  abstract findUserByEmail(
    email: string,
    config: UserConfig,
  ): Promise<User | null>;
  abstract createUser(createUserDto: CreateUserDto): Promise<User>;
}
