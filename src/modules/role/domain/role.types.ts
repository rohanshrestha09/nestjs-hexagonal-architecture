import { ROLE } from '../infrastructure/enums/role.enum';

export type CreateRoleProps = {
  name: ROLE;
};

export type UpdateRoleProps = {
  name?: ROLE;
};
