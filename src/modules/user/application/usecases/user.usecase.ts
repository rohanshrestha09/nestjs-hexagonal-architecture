import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.domain';
import { UserUseCasePort } from '../../ports/in/user-usecase.port';
import { UserRepositoryPort } from '../../ports/out/user-repository.port';

@Injectable()
export class UserUseCase implements UserUseCasePort {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async getUserById(userId: string) {
    return await this.userRepositoryPort.findUserById(userId);
  }

  async getUserByEmail(email: string) {
    return await this.userRepositoryPort.findUserByEmail(email);
  }

  async getUserPasswordById(userId: string) {
    return this.userRepositoryPort.findUserPassword(userId);
  }

  async userExistsByEmail(email: string) {
    const userExists = await this.userRepositoryPort.findUserByEmail(email);

    return !!userExists;
  }

  async createUser(user: User) {
    return await this.userRepositoryPort.createUser(user);
  }
}
