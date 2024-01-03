import { User } from '../../domain/user.domain';

export abstract class UserRepositoryPort {
  abstract findUserPassword(userId: string): Promise<string>;
  abstract findUserById(userId: string): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract createUser(user: User): Promise<User>;
  abstract userExists(email: string): Promise<boolean>;
}
