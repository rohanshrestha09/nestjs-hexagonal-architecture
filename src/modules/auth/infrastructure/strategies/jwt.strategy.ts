import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepositoryPort } from 'src/modules/user/ports/out/user-repository.port';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userRepositoryPort: UserRepositoryPort,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret', { infer: true }),
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userRepositoryPort.findUserByEmail(
        payload?.email,
        {
          relations: ['role'],
        },
      );

      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
