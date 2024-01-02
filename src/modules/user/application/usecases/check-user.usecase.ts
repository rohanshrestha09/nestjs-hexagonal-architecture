import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../ports/out/user-repository.port';

@Injectable()
export class CheckUserUseCase {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async userExists(email: string) {
    const userExists = await this.userRepositoryPort.findUserByEmail(email, {});

    return !!userExists;
  }
}
