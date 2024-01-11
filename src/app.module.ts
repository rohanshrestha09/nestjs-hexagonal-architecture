import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { RoleModule } from './modules/role/role.module';
import { PrivilegeModule } from './modules/privilege/privilege.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { OnlinePaymentModule } from './modules/online-payment/online-payment.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { BlogModule } from './modules/blog/blog.module';
import { BookModule } from './modules/book/book.module';
import { CourseModule } from './modules/course/course.module';
import { OtpModule } from './modules/otp/otp.module';
import { appConfig } from './infrastructure/config/app.config';
import {
  TypeOrmConfigService,
  typeORMDtabaseConfig,
} from './infrastructure/database/config/typeorm.config';
import {
  SequelizeConfigService,
  sequelizeDatabaseConfig,
} from './infrastructure/database/config/sequelize.config';
import { esewaConfig } from './infrastructure/config/esewa.config';
import { khaltiConfig } from './infrastructure/config/khalti.config';
import { authConfig } from './infrastructure/config/auth.config';
import { JwtAuthGuard } from './frameworks/primary/guards/jwt-auth.guard';
import { RolesGuard } from './frameworks/primary/guards/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [
        appConfig,
        authConfig,
        typeORMDtabaseConfig,
        sequelizeDatabaseConfig,
        esewaConfig,
        khaltiConfig,
      ],
      envFilePath: ['.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''), // <-- path to the static files
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return addTransactionalDataSource(
          await new DataSource(options).initialize(),
        );
      },
    }),
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    RoleModule,
    PrivilegeModule,
    UserModule,
    AuthModule,
    OnlinePaymentModule,
    TransactionModule,
    BlogModule,
    BookModule,
    CourseModule,
    OtpModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
