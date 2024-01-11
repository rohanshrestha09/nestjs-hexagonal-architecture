import { User } from '../user/user.domain';

export type CreateOtpProps = {
  code: string;
  user: User;
  expireTime?: Date;
};
