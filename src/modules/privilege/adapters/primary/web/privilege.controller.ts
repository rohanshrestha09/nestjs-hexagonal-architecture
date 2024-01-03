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
import { Roles } from 'src/utils/metadata';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { CreatePrivilegeUseCase } from 'src/modules/privilege/application/usecases/create-privilege.usecase';
import { GetPrivilegeUseCase } from 'src/modules/privilege/application/usecases/get-privilege.usecase';
import { CreatePrivilegeDto } from 'src/modules/privilege/application/dto/create-privilege.dto';
import { QueryPrivilegeDto } from 'src/modules/privilege/application/dto/query-privilege.dto';
import { Privilege } from 'src/modules/privilege/domain/privilege.domain';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@ApiBearerAuth()
@ApiTags('privilege')
@Roles(ROLE.ADMIN)
@Controller('privilege')
export class PrivilegeController {
  constructor(
    private readonly createPrivilegeUseCase: CreatePrivilegeUseCase,
    private readonly getPrivilegeUseCase: GetPrivilegeUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'create privilege' })
  @Transactional()
  async create(@Body() createPrivilegeDto: CreatePrivilegeDto) {
    await this.createPrivilegeUseCase.createPrivilege(
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
      await this.getPrivilegeUseCase.getAllPrivileges(queryPrivilegeDto);

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
      await this.getPrivilegeUseCase.getPrivilegeById(id),
    );
  }
}
