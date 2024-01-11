import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserUseCaseImpl } from 'src/core/application/usecases/user/user.usecase';
import { UserUseCase } from 'src/core/ports/in/user/user-usecase.port';
import { UserRepository } from 'src/core/ports/out/user/user-repository.port';
import { MySQLTypeORMUserEntity } from 'src/frameworks/secondary/mysql-typeorm/user/user-mysql-typeorm.entity';
import { MySQLTypeORMUserRepositoryImpl } from 'src/frameworks/secondary/mysql-typeorm/user/user-mysql-typeorm.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMUserEntity])],
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
