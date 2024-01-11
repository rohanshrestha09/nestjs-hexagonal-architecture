import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Transactional } from 'typeorm-transactional';
import { AdminPrivilegeUseCase } from 'src/core/ports/in/privilege/admin-privilege-usecase.port';
import { Roles } from '../../metadata';
import { CreatePrivilegeDto } from '../../dto/privilege/create-privilege.dto';
import { Privilege } from 'src/core/domain/privilege/privilege.domain';
import { ResponseDto } from '../../dto/response.dto';
import { QueryPrivilegeDto } from '../../dto/privilege/query-privilege.dto';
import { ROLE } from 'src/common/enums/role.enum';

@ApiBearerAuth()
@ApiTags('admin/privilege')
@Roles(ROLE.ADMIN)
@Controller('admin/privilege')
export class AdminPrivilegeController {
  constructor(private readonly privilegeUseCase: AdminPrivilegeUseCase) {}

  @Post()
  @ApiOperation({ summary: 'create privilege' })
  @Transactional()
  async create(@Body() createPrivilegeDto: CreatePrivilegeDto) {
    await this.privilegeUseCase.createPrivilege(
      Privilege.create(createPrivilegeDto),
    );

    return new ResponseDto('Privilege Created');
  }

  @Get()
  @ApiOperation({ summary: 'find all privileges' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    queryPrivilegeDto: QueryPrivilegeDto,
  ) {
    const { page, size } = queryPrivilegeDto;

    const [privileges, count] =
      await this.privilegeUseCase.getAllPrivileges(queryPrivilegeDto);

    return new ResponseDto('Privileges Fetched', privileges, {
      count,
      page,
      size,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'find one privilege' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ResponseDto(
      'Privilege Fetched',
      await this.privilegeUseCase.getPrivilegeById(id),
    );
  }
}
