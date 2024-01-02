import { Injectable } from '@nestjs/common';
import {
  UserRepositoryPort,
  UserConfig,
} from '../../ports/out/user-repository.port';

@Injectable()
export class GetUserUseCase {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async getUserById(userId: string, config: UserConfig) {
    return await this.userRepositoryPort.findUserById(userId, config);
  }

  async getUserByEmail(email: string, config: UserConfig) {
    return await this.userRepositoryPort.findUserByEmail(email, config);
  }

  async getUserPassword(userId: string) {
    return this.userRepositoryPort.findUserPassword(userId);
  }
}
