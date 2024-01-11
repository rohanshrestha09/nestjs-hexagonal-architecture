import { Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/user/user.domain';
import { UserUseCase } from 'src/core/ports/in/user/user-usecase.port';
import { UserRepository } from 'src/core/ports/out/user/user-repository.port';

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
