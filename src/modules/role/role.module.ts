import { Global, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
// import { RoleEntity } from './adapters/out/mysql-typeorm/entities/role.entity';
import { RoleEntity } from './adapters/out/mysql-sequelize/entities/role.entity';
import { RoleController } from './adapters/in/web/role.controller';
// import { RoleRepository } from './adapters/out/mysql-typeorm/repositories/role.repository';
import { RoleRepository } from './adapters/out/mysql-sequelize/repositories/role.repository';
import { GetRoleUseCase } from './application/usecases/get-role.usecase';
import { RoleRepositoryPort } from './ports/out/role-repository.port';

@Global()
@Module({
  imports: [
    // TypeOrmModule.forFeature([RoleEntity]),
    SequelizeModule.forFeature([RoleEntity]),
  ],
  controllers: [RoleController],
  providers: [
    GetRoleUseCase,
    {
      provide: RoleRepositoryPort,
      useClass: RoleRepository,
    },
  ],
  exports: [GetRoleUseCase],
})
export class RoleModule {}
