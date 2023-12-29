import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PRIVILEGE_NAME } from '../../infrastructure/enums/privilege.enum';

export class CreatePrivilegeDto {
  @ApiProperty({
    enum: PRIVILEGE_NAME,
    default: PRIVILEGE_NAME.CUSTOMER_CARE,
  })
  @IsNotEmpty()
  name: string;
}
