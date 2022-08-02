import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { GetCurrentUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorators';
import { ContractsService } from './contracts.service';
import {
  UpdateDraftDto,
  DeleteDraftDto,
  GetContractDto,
  CreateContractDto,
} from './dto';

@Controller()
export class ContractsController {
  constructor(private contractSercive: ContractsService) {}

  @Get('client/contract')
  getOne(@Query() dto: GetContractDto) {
    return this.contractSercive.getOne(dto);
  }
  @Get('client/contract/created/list')
  getAllMyCreatedContracts(@GetCurrentUserId() userId: string) {
    return this.contractSercive.getAllCreatedContract(userId);
  }
  @Get('client/contract/parties/list')
  getAllMyPartiesContracts(@GetCurrentUserId() userId: string) {
    return this.contractSercive.getAllPartiesContract(userId);
  }

  @Post('client/contract')
  @Roles(Role.CLIENT)
  create(@Body() dto: CreateContractDto, @GetCurrentUserId() userId: string) {
    return this.contractSercive.create(dto, userId);
  }
  @Put('client/contract')
  @Roles(Role.CLIENT)
  update(@Body() dto: UpdateDraftDto) {
    return this.contractSercive.update(dto);
  }

  @Delete('client/contract')
  @Roles(Role.CLIENT)
  delete(@Body() dto: DeleteDraftDto) {
    return this.contractSercive.delete(dto);
  }
}
