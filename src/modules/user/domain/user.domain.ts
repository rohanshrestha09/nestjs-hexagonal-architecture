import { Privilege } from 'src/modules/privilege/domain/privilege.domain';
import { Role } from 'src/modules/role/domain/role.domain';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
  role: Role;
  privileges: Privilege[];

  constructor({
    id,
    name,
    email,
    createdAt,
    updatedAt,
    roleId,
    role,
    privileges,
  }: User) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.roleId = roleId;
    this.role = role;
    this.privileges = privileges;
  }
}
