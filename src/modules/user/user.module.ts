import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryPort } from './ports/out/user-repository.port';
import { UserController } from './adapters/primary/web/user.controller';
import { MySQLTypeORMUserEntity } from './adapters/secondary/mysql-typeorm/user-mysql-typeorm.entity';
import { MySQLTypeORMUserRepository } from './adapters/secondary/mysql-typeorm/user-mysql-typeorm.repository';
import { UserUseCasePort } from './ports/in/user-usecase.port';
import { UserUseCase } from './application/usecases/user.usecase';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMUserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: UserUseCasePort,
      useClass: UserUseCase,
    },
    {
      provide: UserRepositoryPort,
      useClass: MySQLTypeORMUserRepository,
    },
  ],
  exports: [UserRepositoryPort, UserUseCasePort],
})
export class UserModule {}
