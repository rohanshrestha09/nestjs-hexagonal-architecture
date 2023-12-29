import { AppConfig } from './app.config';
import { DatabaseConfig } from 'src/database/config/database.config';
import { AuthConfig } from 'src/modules/auth/infrastructure/configs/auth.config';
import { EsewaConfig } from 'src/modules/online-payment/infrastructure/configs/esewa-online-payment.config';
import { KhaltiConfig } from 'src/modules/online-payment/infrastructure/configs/khalti-online-payment.config';

export type AllConfig = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  esewa: EsewaConfig;
  khalti: KhaltiConfig;
};
