import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY, ROLES_KEY } from 'src/constant';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
