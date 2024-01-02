import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepositoryPort } from '../../ports/out/user-repository.port';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepositoryPort.createUser(createUserDto);
  }
}
