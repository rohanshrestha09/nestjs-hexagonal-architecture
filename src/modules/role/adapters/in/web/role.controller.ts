import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleControllerPort } from 'src/modules/role/ports/in/role-controller.port';

@ApiTags('role')
@Controller('role')
export class RoleController extends RoleControllerPort {
  constructor() {
    super();
  }
}
