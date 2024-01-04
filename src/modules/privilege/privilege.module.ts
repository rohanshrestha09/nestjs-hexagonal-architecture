import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivilegeController } from './adapters/primary/web/privilege.controller';
import { PrivilegeRepositoryPort } from './ports/out/privilege-repository.port';
import { MySQLTypeORMPrivilegeEntity } from './adapters/secondary/mysql-typeorm/privilege-mysql-typeorm.entity';
import { MySQLTypeORMPrivilegeRepository } from './adapters/secondary/mysql-typeorm/privilege-mysql-typeorm.repository';
import { PrivilegeUseCasePort } from './ports/in/privilege-usecase.port';
import { PrivilegeUseCase } from './application/usecases/privilege.usecase';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMPrivilegeEntity])],
  controllers: [PrivilegeController],
  providers: [
    {
      provide: PrivilegeUseCasePort,
      useClass: PrivilegeUseCase,
    },
    {
      provide: PrivilegeRepositoryPort,
      useClass: MySQLTypeORMPrivilegeRepository,
    },
  ],
  exports: [PrivilegeRepositoryPort, PrivilegeUseCasePort],
})
export class PrivilegeModule {}
