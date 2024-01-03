import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../ports/out/user-repository.port';

@Injectable()
export class GetUserUseCase {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async getUserById(userId: string) {
    return await this.userRepositoryPort.findUserById(userId);
  }

  async getUserByEmail(email: string) {
    return await this.userRepositoryPort.findUserByEmail(email);
  }

  async getUserPassword(userId: string) {
    return this.userRepositoryPort.findUserPassword(userId);
  }
}
