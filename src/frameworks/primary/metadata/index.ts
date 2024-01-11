import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY, ROLES_KEY } from 'src/common/constants';
import { ROLE } from 'src/common/enums/role.enum';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
