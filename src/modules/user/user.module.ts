import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDAOAdapter } from './adapters/out/user-dao.adapter';
import { UserDAO } from './application/dao/user.dao';
import { UserEntity } from './adapters/out/mysql-typeorm/entities/user.entity';
import { UserController } from './adapters/in/web/user.controller';
import { UserRepository } from './adapters/out/mysql-typeorm/repositories/user.repository';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { GetUserUseCase } from './application/usecases/get-user.usecase';
import { CheckUserUseCase } from './application/usecases/check-user.usecase';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    GetUserUseCase,
    CheckUserUseCase,
    {
      provide: UserDAO,
      useClass: UserDAOAdapter,
    },
  ],
  exports: [CreateUserUseCase, GetUserUseCase, CheckUserUseCase],
})
export class UserModule {}
