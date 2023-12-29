import { Injectable } from '@nestjs/common';
import { UserDAO } from '../dao/user.dao';

@Injectable()
export class CheckUserUseCase {
  constructor(private userDAO: UserDAO) {}

  async userExists(email: string) {
    const userExists = await this.userDAO.findUserByEmail(email, {});

    return !!userExists;
  }
}
