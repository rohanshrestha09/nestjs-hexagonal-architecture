import { User } from '../../domain/user.domain';

export abstract class UserUseCase {
  abstract getUserById(userId: string): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User>;
  abstract getUserPasswordById(userId: string): Promise<string>;
  abstract createUser(user: User): Promise<User>;
  abstract userExistsByEmail(email: string): Promise<boolean>;
}
