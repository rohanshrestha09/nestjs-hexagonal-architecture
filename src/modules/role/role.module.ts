import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './adapters/primary/web/role.controller';
import { GetRoleUseCase } from './application/usecases/get-role.usecase';
import { RoleRepositoryPort } from './ports/out/role-repository.port';
import { MySQLTypeORMRoleEntity } from './adapters/secondary/mysql-typeorm/role-mysql-typeorm.entity';
import { MySQLTypeORMRoleRepository } from './adapters/secondary/mysql-typeorm/role-mysql-typeorm.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMRoleEntity])],
  controllers: [RoleController],
  providers: [
    GetRoleUseCase,
    {
      provide: RoleRepositoryPort,
      useClass: MySQLTypeORMRoleRepository,
    },
  ],
  exports: [RoleRepositoryPort],
})
export class RoleModule {}
