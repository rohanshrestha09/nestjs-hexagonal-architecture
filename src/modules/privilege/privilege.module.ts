import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivilegeController } from './adapters/primary/web/privilege.controller';
import { CreatePrivilegeUseCase } from './application/usecases/create-privilege.usecase';
import { GetPrivilegeUseCase } from './application/usecases/get-privilege.usecase';
import { PrivilegeRepositoryPort } from './ports/out/privilege-repository.port';
import { MySQLTypeORMPrivilegeEntity } from './adapters/secondary/mysql-typeorm/privilege-mysql-typeorm.entity';
import { MySQLTypeORMPrivilegeRepository } from './adapters/secondary/mysql-typeorm/privilege-mysql-typeorm.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMPrivilegeEntity])],
  controllers: [PrivilegeController],
  providers: [
    CreatePrivilegeUseCase,
    GetPrivilegeUseCase,
    {
      provide: PrivilegeRepositoryPort,
      useClass: MySQLTypeORMPrivilegeRepository,
    },
  ],
  exports: [PrivilegeRepositoryPort],
})
export class PrivilegeModule {}
