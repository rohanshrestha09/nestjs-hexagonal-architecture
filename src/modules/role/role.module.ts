import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './adapters/primary/web/role.controller';
import { RoleRepository } from './ports/out/role-repository.port';
import { MySQLTypeORMRoleEntity } from './adapters/secondary/mysql-typeorm/role-mysql-typeorm.entity';
import { MySQLTypeORMRoleRepositoryImpl } from './adapters/secondary/mysql-typeorm/role-mysql-typeorm.repository';
import { RoleUseCaseImpl } from './application/usecases/role.usecase';
import { RoleUseCase } from './ports/in/role-usecase.port';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMRoleEntity])],
  controllers: [RoleController],
  providers: [
    {
      provide: RoleUseCase,
      useClass: RoleUseCaseImpl,
    },
    {
      provide: RoleRepository,
      useClass: MySQLTypeORMRoleRepositoryImpl,
    },
  ],
  exports: [RoleRepository, RoleUseCase],
})
export class RoleModule {}
