import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleUseCaseImpl } from 'src/core/application/usecases/role/role.usecase';
import { RoleUseCase } from 'src/core/ports/in/role/role-usecase.port';
import { RoleRepository } from 'src/core/ports/out/role/role-repository.port';
import { MySQLTypeORMRoleEntity } from 'src/frameworks/secondary/mysql-typeorm/role/role-mysql-typeorm.entity';
import { MySQLTypeORMRoleRepositoryImpl } from 'src/frameworks/secondary/mysql-typeorm/role/role-mysql-typeorm.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMRoleEntity])],
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
