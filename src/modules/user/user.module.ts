import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { GetUserUseCase } from './application/usecases/get-user.usecase';
import { CheckUserUseCase } from './application/usecases/check-user.usecase';
import { UserRepositoryPort } from './ports/out/user-repository.port';
import { UserController } from './adapters/primary/web/user.controller';
import { MySQLTypeORMUserEntity } from './adapters/secondary/mysql-typeorm/user-mysql-typeorm.entity';
import { MySQLTypeORMUserRepository } from './adapters/secondary/mysql-typeorm/user-mysql-typeorm.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMUserEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    CheckUserUseCase,
    {
      provide: UserRepositoryPort,
      useClass: MySQLTypeORMUserRepository,
    },
  ],
  exports: [UserRepositoryPort],
})
export class UserModule {}
