import { ROLE } from 'src/common/enums/role.enum';

export type CreateRoleProps = {
  name: ROLE;
};

export type UpdateRoleProps = {
  name?: ROLE;
};
