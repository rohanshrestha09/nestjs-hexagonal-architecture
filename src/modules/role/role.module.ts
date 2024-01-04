import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './adapters/primary/web/role.controller';
import { RoleRepositoryPort } from './ports/out/role-repository.port';
import { MySQLTypeORMRoleEntity } from './adapters/secondary/mysql-typeorm/role-mysql-typeorm.entity';
import { MySQLTypeORMRoleRepository } from './adapters/secondary/mysql-typeorm/role-mysql-typeorm.repository';
import { RoleUseCase } from './application/usecases/role.usecase';
import { RoleUseCasePort } from './ports/in/role-usecase.port';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMRoleEntity])],
  controllers: [RoleController],
  providers: [
    {
      provide: RoleUseCasePort,
      useClass: RoleUseCase,
    },
    {
      provide: RoleRepositoryPort,
      useClass: MySQLTypeORMRoleRepository,
    },
  ],
  exports: [RoleRepositoryPort, RoleUseCasePort],
})
export class RoleModule {}
