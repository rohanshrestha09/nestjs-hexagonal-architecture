import { z } from 'zod';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/modules/user/domain/user.domain';
import { CreateOtpProps } from './otp.type';

export class Otp {
  id: number;
  code: string;
  expireTime: Date;
  user: User;

  public static create(createOtpProps: CreateOtpProps) {
    const now = new Date();

    now.setMinutes(now.getMinutes() + 10);

    const createOtpValidator = z.object({
      user: z.instanceof(User),
      code: z.string(),
      expireTime: z.date().optional().default(now),
    });

    return plainToInstance(Otp, createOtpValidator.parse(createOtpProps), {
      exposeUnsetFields: false,
    });
  }
}
