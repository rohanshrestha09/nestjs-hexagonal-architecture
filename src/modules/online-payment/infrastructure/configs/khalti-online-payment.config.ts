import { registerAs } from '@nestjs/config';

export type KhaltiConfig = {
  secretKey: string;
  paymentMode: string;
};

export const khaltiConfig = registerAs<KhaltiConfig>('khalti', () => ({
  secretKey: process.env.KHALTI_SECRET_KEY as string,
  paymentMode: process.env.KHALTI_PAYMENT_MODE as string,
}));
