import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './adapters/primary/web/user.controller';
import { MySQLTypeORMUserEntity } from './adapters/secondary/mysql-typeorm/user-mysql-typeorm.entity';
import { UserUseCaseImpl } from './application/usecases/user.usecase';
import { UserUseCase } from './ports/in/user-usecase.port';
import { UserRepository } from './ports/out/user-repository.port';
import { MySQLTypeORMUserRepositoryImpl } from './adapters/secondary/mysql-typeorm/user-mysql-typeorm.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMUserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: UserUseCase,
      useClass: UserUseCaseImpl,
    },
    {
      provide: UserRepository,
      useClass: MySQLTypeORMUserRepositoryImpl,
    },
  ],
  exports: [UserRepository, UserUseCase],
})
export class UserModule {}
