import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetUserUseCase } from 'src/modules/user/application/usecases/get-user.usecase';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret', { infer: true }),
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.getUserUseCase.getUserByEmail(payload?.email, {
        relations: { role: true },
      });

      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
