import { Global, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
// import { UserEntity } from './adapters/out/mysql-typeorm/entities/user.entity';
import { UserEntity } from './adapters/out/mysql-sequelize/entities/user.entity';
import { UserController } from './adapters/in/web/user.controller';
// import { UserRepository } from './adapters/out/mysql-typeorm/repositories/user.repository';
import { UserRepository } from './adapters/out/mysql-sequelize/repositories/user.repository';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { GetUserUseCase } from './application/usecases/get-user.usecase';
import { CheckUserUseCase } from './application/usecases/check-user.usecase';
import { UserRepositoryPort } from './ports/out/user-repository.port';

@Global()
@Module({
  imports: [
    // TypeOrmModule.forFeature([UserEntity]),
    SequelizeModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    CheckUserUseCase,
    {
      provide: UserRepositoryPort,
      useClass: UserRepository,
    },
  ],
  exports: [UserRepositoryPort],
})
export class UserModule {}
