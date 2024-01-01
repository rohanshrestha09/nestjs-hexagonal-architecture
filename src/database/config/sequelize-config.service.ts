import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { AllConfig } from 'src/config/config.type';
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
      autoLoadModels: true,
      define: {
        timestamps: true,
      },
    };
  }
}
