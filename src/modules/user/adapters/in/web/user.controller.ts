import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserControllerPort } from 'src/modules/user/ports/in/user-controller.port';

@ApiTags('user')
@Controller('user')
export class UserController implements UserControllerPort {}
