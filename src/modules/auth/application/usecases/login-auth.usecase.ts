import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login-auth.dto';
import { UserRepositoryPort } from 'src/modules/user/ports/out/user-repository.port';

@Injectable()
export class LoginUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepositoryPort: UserRepositoryPort,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userRepositoryPort.findUserByEmail(email, {});

    if (!user) throw new UnauthorizedException('Unauthorized');

    const userPassword = await this.userRepositoryPort.findUserPassword(
      user.id,
    );

    const isMatched = await bcrypt.compare(password, userPassword);

    if (!isMatched) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
