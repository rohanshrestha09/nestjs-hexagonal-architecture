import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/domain/user.domain';
import { UserUseCase } from 'src/modules/user/ports/in/user-usecase.port';
import { RoleUseCase } from 'src/modules/role/ports/in/role-usecase.port';
import { AuthUseCase } from '../../ports/in/auth-usecase.port';
import { LoginDto } from '../dto/login-auth.dto';
import { RegisterDto } from '../dto/register-auth.dto';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

export class AuthUseCaseImpl implements AuthUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userUseCase: UserUseCase,
    private readonly roleUseCase: RoleUseCase,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userUseCase.getUserByEmail(email);

    if (!user) throw new UnauthorizedException('Unauthorized');

    const userPassword = await this.userUseCase.getUserPasswordById(user.id);

    const isMatched = await bcrypt.compare(password, userPassword);

    if (!isMatched) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register({ name, email, password }: RegisterDto) {
    const userExists = await this.userUseCase.userExistsByEmail(email);

    if (userExists)
      throw new ForbiddenException(
        'User already exists. Choose a different email',
      );

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);

    const role = await this.roleUseCase.getRoleByName(ROLE.USER);

    const user = await this.userUseCase.createUser(
      User.create({
        name,
        email,
        password: encryptedPassword,
        roleId: role.id,
      }),
    );

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
