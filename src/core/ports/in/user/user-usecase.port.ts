import { User } from 'src/core/domain/user/user.domain';

export abstract class UserUseCase {
  abstract getUserById(userId: string): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User>;
  abstract getUserByPhone(phone: string): Promise<User>;
  abstract getUserPassword(userId: string): Promise<string>;
  abstract createUser(user: User): Promise<User>;
  abstract userExistsByEmail(email: string): Promise<boolean>;
  abstract userExistsByPhone(phone: string): Promise<boolean>;
  abstract changeUserPassword(userId: string, password: string): Promise<void>;
}
