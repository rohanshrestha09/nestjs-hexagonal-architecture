import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './adapters/out/mysql-typeorm/entities/role.entity';
import { RoleController } from './adapters/in/web/role.controller';
import { RoleRepository } from './adapters/out/mysql-typeorm/repositories/role.repository';
import { RoleDAO } from './application/dao/role.dao';
import { RoleDAOAdapter } from './adapters/out/role-dao.adapter';
import { GetRoleUseCase } from './application/usecases/get-role.usecase';
import { BaseRepository } from 'src/base/repository/base.repository';
import { Role } from './domain/role.domain';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [
    GetRoleUseCase,
    {
      provide: BaseRepository<Role>,
      useClass: RoleRepository,
    },
    {
      provide: RoleDAO,
      useClass: RoleDAOAdapter,
    },
  ],
  exports: [GetRoleUseCase],
})
export class RoleModule {}
