import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDAO } from '../dao/user.dao';

@Injectable()
export class CreateUserUseCase {
  constructor(private userDAO: UserDAO) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userDAO.createUser(createUserDto);
  }
}
