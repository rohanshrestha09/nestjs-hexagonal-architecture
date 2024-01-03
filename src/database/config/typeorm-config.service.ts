import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfig } from '../../config/config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfig>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('typeORMDatabase.type', { infer: true }),
      url: this.configService.get('typeORMDatabase.url', { infer: true }),
      host: this.configService.get('typeORMDatabase.host', { infer: true }),
      port: this.configService.get('typeORMDatabase.port', { infer: true }),
      username: this.configService.get('typeORMDatabase.username', {
        infer: true,
      }),
      password: this.configService.get('typeORMDatabase.password', {
        infer: true,
      }),
      database: this.configService.get('typeORMDatabase.name', { infer: true }),
      synchronize: this.configService.get('typeORMDatabase.synchronize', {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      logging: false,
      entities: [__dirname + '/../../**/*-typeorm/*.entity{.ts,.js}'],
      // autoLoadEntities: true,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
      extra: {
        // based on https://node-postgres.com/apis/pool
        // max connection pool size
        max: this.configService.get('typeORMDatabase.maxConnections', {
          infer: true,
        }),
        ssl: this.configService.get('typeORMDatabase.sslEnabled', {
          infer: true,
        })
          ? {
              rejectUnauthorized: this.configService.get(
                'typeORMDatabase.rejectUnauthorized',
                { infer: true },
              ),
              ca:
                this.configService.get('typeORMDatabase.ca', { infer: true }) ??
                undefined,
              key:
                this.configService.get('typeORMDatabase.key', {
                  infer: true,
                }) ?? undefined,
              cert:
                this.configService.get('typeORMDatabase.cert', {
                  infer: true,
                }) ?? undefined,
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
