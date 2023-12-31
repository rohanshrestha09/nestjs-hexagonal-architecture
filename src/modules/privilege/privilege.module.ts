import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivilegeEntity } from './adapters/out/mysql-typeorm/entites/privilege.entity';
import { PrivilegeController } from './adapters/in/web/privilege.controller';
import { PrivilegeRepository } from './adapters/out/mysql-typeorm/repositories/privilege.repository';
import { PrivilegeDAO } from './application/dao/privilege.dao';
import { PrivilegeDAOAdapter } from './adapters/out/privilege-dao.adapter';
import { CreatePrivilegeUseCase } from './application/usecases/create-privilege.usecase';
import { GetPrivilegeUseCase } from './application/usecases/get-privilege.usecase';
import { BaseRepository } from 'src/base/repository/base.repository';
import { Privilege } from './domain/privilege.domain';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PrivilegeEntity])],
  controllers: [PrivilegeController],
  providers: [
    PrivilegeRepository,
    CreatePrivilegeUseCase,
    GetPrivilegeUseCase,
    {
      provide: BaseRepository<Privilege>,
      useClass: PrivilegeRepository,
    },
    {
      provide: PrivilegeDAO,
      useClass: PrivilegeDAOAdapter,
    },
  ],
  exports: [CreatePrivilegeUseCase, GetPrivilegeUseCase],
})
export class PrivilegeModule {}
