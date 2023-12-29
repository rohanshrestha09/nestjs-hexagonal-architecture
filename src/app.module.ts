import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { appConfig } from './config/app.config';
import { authConfig } from './modules/auth/infrastructure/configs/auth.config';
import { databaseConfig } from './database/config/database.config';
import { esewaConfig } from './modules/online-payment/infrastructure/configs/esewa-online-payment.config';
import { khaltiConfig } from './modules/online-payment/infrastructure/configs/khalti-online-payment.config';
import { TypeOrmConfigService } from './database/config/typeorm-config.service';
import { RolesGuard } from './modules/role/infrastructure/guards/role.guard';
import { JwtAuthGuard } from './modules/auth/infrastructure/guards/jwt-auth.guard';
import { RoleModule } from './modules/role/role.module';
import { PrivilegeModule } from './modules/privilege/privilege.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { OnlinePaymentModule } from './modules/online-payment/online-payment.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig, esewaConfig, khaltiConfig],
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
    RoleModule,
    PrivilegeModule,
    UserModule,
    AuthModule,
    OnlinePaymentModule,
    TransactionModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
