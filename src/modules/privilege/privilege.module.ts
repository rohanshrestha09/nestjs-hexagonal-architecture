import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPrivilegeUseCaseImpl } from 'src/core/application/usecases/privilege/admin-privilige.usecase';
import { AdminPrivilegeUseCase } from 'src/core/ports/in/privilege/admin-privilege-usecase.port';
import { PrivilegeRepository } from 'src/core/ports/out/privilege/privilege-repository.port';
import { AdminPrivilegeController } from 'src/frameworks/primary/controllers/privilege/admin-privilege.controller';
import { MySQLTypeORMPrivilegeEntity } from 'src/frameworks/secondary/mysql-typeorm/privilege/privilege-mysql-typeorm.entity';
import { MySQLTypeORMPrivilegeRepositoryImpl } from 'src/frameworks/secondary/mysql-typeorm/privilege/privilege-mysql-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMPrivilegeEntity])],
  controllers: [AdminPrivilegeController],
  providers: [
    {
      provide: AdminPrivilegeUseCase,
      useClass: AdminPrivilegeUseCaseImpl,
    },
    {
      provide: PrivilegeRepository,
      useClass: MySQLTypeORMPrivilegeRepositoryImpl,
    },
  ],
  exports: [PrivilegeRepository, AdminPrivilegeUseCase],
})
export class PrivilegeModule {}
