import { Injectable } from '@nestjs/common';
import { UserConfig, UserDAO } from '../dao/user.dao';

@Injectable()
export class GetUserUseCase {
  constructor(private userDAO: UserDAO) {}

  async getUserById(userId: string, config: UserConfig) {
    return await this.userDAO.findUserById(userId, config);
  }

  async getUserByEmail(email: string, config: UserConfig) {
    return await this.userDAO.findUserByEmail(email, config);
  }

  async getUserPassword(userId: string) {
    return this.userDAO.findUserPassword(userId);
  }
}
