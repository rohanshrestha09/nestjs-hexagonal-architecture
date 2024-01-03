import { Global, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
// import { PrivilegeEntity } from './adapters/out/mysql-typeorm/entites/privilege.entity';
import { PrivilegeEntity } from './adapters/out/mysql-sequelize/entities/privilege.entity';
import { PrivilegeController } from './adapters/in/web/privilege.controller';
// import { PrivilegeRepository } from './adapters/out/mysql-typeorm/repositories/privilege.repository';
import { PrivilegeRepository } from './adapters/out/mysql-sequelize/repositories/privilege.repository';
import { CreatePrivilegeUseCase } from './application/usecases/create-privilege.usecase';
import { GetPrivilegeUseCase } from './application/usecases/get-privilege.usecase';
import { PrivilegeRepositoryPort } from './ports/out/privilege-repository.port';

@Global()
@Module({
  imports: [
    // TypeOrmModule.forFeature([PrivilegeEntity]),
    SequelizeModule.forFeature([PrivilegeEntity]),
  ],
  controllers: [PrivilegeController],
  providers: [
    PrivilegeRepository,
    CreatePrivilegeUseCase,
    GetPrivilegeUseCase,
    {
      provide: PrivilegeRepositoryPort,
      useClass: PrivilegeRepository,
    },
  ],
  exports: [PrivilegeRepositoryPort],
})
export class PrivilegeModule {}
