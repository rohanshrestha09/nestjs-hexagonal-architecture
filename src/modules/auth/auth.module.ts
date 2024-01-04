import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthController } from './adapters/primary/web/auth.controller';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { AllConfig } from 'src/config/config.type';
import { AuthUseCasePort } from './ports/in/auth-usecase.port';
import { AuthUseCase } from './application/usecases/auth.usecase';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) => ({
        secret: configService.get('auth.secret', { infer: true }),
        signOptions: {
          expiresIn: configService.get('auth.expires', { infer: true }),
        },
      }),
    }),
    UserModule,
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthUseCasePort,
      useClass: AuthUseCase,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
