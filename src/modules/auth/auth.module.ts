import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthController } from './adapters/in/web/auth.controller';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { LoginUseCase } from './application/usecases/login-auth.usecase';
import { RegisterUseCase } from './application/usecases/register-auth.usecase';
import { AllConfig } from 'src/config/config.type';

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
  providers: [LoginUseCase, RegisterUseCase, JwtStrategy],
  exports: [LoginUseCase, RegisterUseCase],
})
export class AuthModule {}
