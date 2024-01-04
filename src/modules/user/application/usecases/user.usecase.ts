import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.domain';
import { UserUseCase } from '../../ports/in/user-usecase.port';
import { UserRepository } from '../../ports/out/user-repository.port';

@Injectable()
export class UserUseCaseImpl implements UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async getUserById(userId: string) {
    return await this.userRepository.findUserById(userId);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async getUserPasswordById(userId: string) {
    return this.userRepository.findUserPassword(userId);
  }

  async userExistsByEmail(email: string) {
    const userExists = await this.userRepository.findUserByEmail(email);

    return !!userExists;
  }

  async createUser(user: User) {
    return await this.userRepository.createUser(user);
  }
}
