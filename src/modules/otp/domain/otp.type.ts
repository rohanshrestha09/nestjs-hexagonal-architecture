import { User } from 'src/modules/user/domain/user.domain';

export type CreateOtpProps = {
  code: string;
  user: User;
  expireTime?: Date;
};
