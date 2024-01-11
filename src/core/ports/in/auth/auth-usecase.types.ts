export type LoginWithEmailDto = {
  email: string;
  password: string;
};

export type LoginWithPhoneDto = {
  phone: string;
  password: string;
};

export type RegisterWithEmailDto = {
  name: string;
  email: string;
  password: string;
};

export type RegisterWithPhoneDto = {
  name: string;
  phone: string;
  password: string;
};

export type ResetPasswordWithPhoneDto = {
  phone: string;
  code: string;
  password: string;
};

export type ResetPasswordWithEmailDto = {
  email: string;
  code: string;
  password: string;
};

export type VerifyEmailUserDto = {
  email: string;
  code: string;
};

export type VerifyPhoneUserDto = {
  phone: string;
  code: string;
};
