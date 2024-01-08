import { User } from '../../domain/user.domain';

export abstract class UserRepository {
  abstract findUserPassword(userId: string): Promise<string>;
  abstract findUserById(userId: string): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract findUserByPhone(phone: string): Promise<User>;
  abstract createUser(user: User): Promise<User>;
  abstract userExistsByEmail(email: string): Promise<boolean>;
  abstract userExistsByPhone(phone: string): Promise<boolean>;
  abstract changeUserPassword(userId: string, password: string): Promise<void>;
}
