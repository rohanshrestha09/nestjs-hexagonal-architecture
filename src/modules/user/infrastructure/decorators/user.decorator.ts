import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

export const User = createParamDecorator(
  (role: ROLE, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request[role.toLowerCase()] ?? request.user;
  },
);
