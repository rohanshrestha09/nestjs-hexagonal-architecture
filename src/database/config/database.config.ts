import { registerAs } from '@nestjs/config';

export type TypeORMDatabaseConfig = {
  url: string;
  type: string;
  host: string;
  port: number;
  password: string;
  name: string;
  username: string;
  synchronize: boolean;
  maxConnections: number;
  sslEnabled: boolean;
  rejectUnauthorized: boolean;
  ca: string;
  key: string;
  cert: string;
};

export type SequelizeDatabaseConfig = {
  dialect: string;
  host: string;
  port: string;
  username: string;
  password: string;
  name: string;
};

export const typeORMDtabaseConfig = registerAs<TypeORMDatabaseConfig>(
  'typeORMDatabase',
  () => ({
    url: process.env.TYPEORM_DATABASE_URL,
    type: process.env.TYPEORM_DATABASE_TYPE,
    host: process.env.TYPEORM_DATABASE_HOST,
    port: parseInt(process.env.TYPEORM_DATABASE_PORT, 10) || 5432,
    password: process.env.TYPEORM_DATABASE_PASSWORD,
    name: process.env.TYPEORM_DATABASE_NAME,
    username: process.env.TYPEORM_DATABASE_USERNAME,
    synchronize: process.env.TYPEORM_DATABASE_SYNCHRONIZE === 'true',
    maxConnections:
      parseInt(process.env.TYPEORM_DATABASE_MAX_CONNECTIONS, 10) || 100,
    sslEnabled: process.env.TYPEORM_DATABASE_SSL_ENABLED === 'true',
    rejectUnauthorized:
      process.env.TYPEORM_DATABASE_REJECT_UNAUTHORIZED === 'true',
    ca: process.env.TYPEORM_DATABASE_CA,
    key: process.env.TYPEORM_DATABASE_KEY,
    cert: process.env.TYPEORM_DATABASE_CERT,
  }),
);

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
