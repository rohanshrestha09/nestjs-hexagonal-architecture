import { User } from '../../domain/user.domain';

export class UserMapper {
  public static toDomain(user: User): User {
    return new User(user);
  }

  public static toDomains(users: User[]): User[] {
    return users?.map((user) => new User(user));
  }
}
