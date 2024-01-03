export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  roleId: number;
};

export type UpdateUserProps = {
  name?: string;
  password?: string;
};
