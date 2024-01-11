import { AppConfig } from './app.config';
import { SequelizeDatabaseConfig } from '../database/config/sequelize.config';
import { TypeORMDatabaseConfig } from '../database/config/typeorm.config';
import { AuthConfig } from './auth.config';
import { EsewaConfig } from './esewa.config';
import { KhaltiConfig } from './khalti.config';

export type AllConfig = {
  app: AppConfig;
  auth: AuthConfig;
  typeORMDatabase: TypeORMDatabaseConfig;
  sequelizeDatabase: SequelizeDatabaseConfig;
  esewa: EsewaConfig;
  khalti: KhaltiConfig;
};
