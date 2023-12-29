import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register-auth.dto';
import { CreateUserUseCase } from 'src/modules/user/application/usecases/create-user.usecase';
import { CheckUserUseCase } from 'src/modules/user/application/usecases/check-user.usecase';
import { GetRoleUseCase } from 'src/modules/role/application/usecases/get-role.usecase';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@Injectable()
export class RegisterUseCase {
  constructor(
    private jwtService: JwtService,
    private checkUserUseCase: CheckUserUseCase,
    private createUserUseCase: CreateUserUseCase,
    private getRoleUseCase: GetRoleUseCase,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const userExists = await this.checkUserUseCase.userExists(email);

    if (userExists)
      throw new ForbiddenException(
        'User already exists. Choose a different email',
      );

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);

    const role = await this.getRoleUseCase.getRoleByName(ROLE.USER);

    const user = await this.createUserUseCase.createUser({
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
