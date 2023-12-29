import { User } from 'src/modules/user/domain/user.domain';

export class Privilege {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];

  constructor({ id, name, users, createdAt, updatedAt }: Privilege) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.users = users;
  }
}
