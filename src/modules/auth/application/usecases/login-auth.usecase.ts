import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login-auth.dto';
import { GetUserUseCase } from 'src/modules/user/application/usecases/get-user.usecase';

@Injectable()
export class LoginUseCase {
  constructor(
    private jwtService: JwtService,
    private getUserUseCase: GetUserUseCase,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.getUserUseCase.getUserByEmail(email, {});

    if (!user) throw new UnauthorizedException('Unauthorized');

    const userPassword = await this.getUserUseCase.getUserPassword(user.id);

    const isMatched = await bcrypt.compare(password, userPassword);

    if (!isMatched) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
