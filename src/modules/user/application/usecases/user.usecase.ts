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

  async getUserByPhone(phone: string) {
    return await this.userRepository.findUserByPhone(phone);
  }

  async getUserPassword(userId: string) {
    return await this.userRepository.findUserPassword(userId);
  }

  async changeUserPassword(userId: string, password: string) {
    return await this.userRepository.changeUserPassword(userId, password);
  }

  async userExistsByEmail(email: string) {
    return await this.userRepository.userExistsByEmail(email);
  }

  async userExistsByPhone(phone: string) {
    return await this.userRepository.userExistsByPhone(phone);
  }

  async createUser(user: User) {
    return await this.userRepository.createUser(user);
  }
}
