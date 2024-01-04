import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivilegeController } from './adapters/primary/web/privilege.controller';
import { PrivilegeRepository } from './ports/out/privilege-repository.port';
import { MySQLTypeORMPrivilegeEntity } from './adapters/secondary/mysql-typeorm/privilege-mysql-typeorm.entity';
import { MySQLTypeORMPrivilegeRepositoryImpl } from './adapters/secondary/mysql-typeorm/privilege-mysql-typeorm.repository';
import { PrivilegeUseCase } from './ports/in/privilege-usecase.port';
import { PrivilegeUseCaseImpl } from './application/usecases/privilege.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMPrivilegeEntity])],
  controllers: [PrivilegeController],
  providers: [
    {
      provide: PrivilegeUseCase,
      useClass: PrivilegeUseCaseImpl,
    },
    {
      provide: PrivilegeRepository,
      useClass: MySQLTypeORMPrivilegeRepositoryImpl,
    },
  ],
  exports: [PrivilegeRepository, PrivilegeUseCase],
})
export class PrivilegeModule {}
