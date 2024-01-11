import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { registerAs } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { AllConfig } from 'src/infrastructure/config/config.type';

export type SequelizeDatabaseConfig = {
  dialect: string;
  host: string;
  port: string;
  username: string;
  password: string;
  name: string;
};

export const sequelizeDatabaseConfig = registerAs<SequelizeDatabaseConfig>(
  'sequelizeDatabase',
  () => ({
    dialect: process.env.SEQUELIZE_DATABASE_DIALECT,
    host: process.env.SEQUELIZE_DATABASE_HOST,
    port: process.env.SEQUELIZE_DATABASE_PORT,
    username: process.env.SEQUELIZE_DATABASE_USERNAME,
    password: process.env.SEQUELIZE_DATABASE_PASSWORD,
    name: process.env.SEQUELIZE_DATABASE_NAME,
  }),
);

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService<AllConfig>) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: this.configService.get('sequelizeDatabase.dialect', {
        infer: true,
      }),
      host: this.configService.get('sequelizeDatabase.host', { infer: true }),
      port: this.configService.get('sequelizeDatabase.port', { infer: true }),
      username: this.configService.get('sequelizeDatabase.username', {
        infer: true,
      }),
      password: this.configService.get('sequelizeDatabase.password', {
        infer: true,
      }),
      database: this.configService.get('sequelizeDatabase.name', {
        infer: true,
      }),
      models: [__dirname + '/../../**/*-sequelize/**/*.entity{.ts,.js}'],
      // autoLoadModels: true,
      define: {
        timestamps: true,
      },
    };
  }
}
