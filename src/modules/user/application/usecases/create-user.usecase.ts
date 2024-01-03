import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.domain';
import { UserRepositoryPort } from '../../ports/out/user-repository.port';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async createUser(user: User) {
    return await this.userRepositoryPort.createUser(user);
  }
}
