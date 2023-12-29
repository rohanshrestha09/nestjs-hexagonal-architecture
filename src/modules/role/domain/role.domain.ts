import { User } from 'src/modules/user/domain/user.domain';
import { ROLE } from '../infrastructure/enums/role.enum';

export class Role {
  id: number;
  name: ROLE;
  createdAt: Date;
  updatedAt: Date;
  users: User[];

  constructor({ id, name, createdAt, updatedAt, users }: Role) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.users = users;
  }
}
