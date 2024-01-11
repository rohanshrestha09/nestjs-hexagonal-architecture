import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AllConfig } from 'src/infrastructure/config/config.type';
import { JwtStrategy } from 'src/frameworks/primary/strategies/jwt.strategy';
import { AuthUseCase } from 'src/core/ports/in/auth/auth-usecase.port';
import { AuthUseCaseImpl } from 'src/core/application/usecases/auth/auth.usecase';
import { AuthController } from 'src/frameworks/primary/controllers/auth/auth.controller';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { OtpModule } from '../otp/otp.module';
import { CourseModule } from '../course/course.module';

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
    OtpModule,
    CourseModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthUseCase,
      useClass: AuthUseCaseImpl,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
