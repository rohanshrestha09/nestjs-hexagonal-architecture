import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register-auth.dto';
import { UserRepositoryPort } from 'src/modules/user/ports/out/user-repository.port';
import { RoleRepositoryPort } from 'src/modules/role/ports/out/role-repository.port';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@Injectable()
export class RegisterUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepositoryPort: UserRepositoryPort,
    private roleRepositoryPort: RoleRepositoryPort,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const userExists = await this.userRepositoryPort.userExists(email);

    if (userExists)
      throw new ForbiddenException(
        'User already exists. Choose a different email',
      );

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);

    const role = await this.roleRepositoryPort.findRoleByName(ROLE.USER);

    const user = await this.userRepositoryPort.createUser({
      name,
      email,
      password: encryptedPassword,
      roleId: role.id,
    });

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
