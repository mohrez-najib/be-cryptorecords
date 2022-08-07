import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Role } from '@prisma/client';
import { GetCurrentUserId } from 'src/common/decorators';
import { Roles } from 'src/common/decorators/roles.decorators';
import { ContractsService } from './contracts.service';
import { UpdateContractDto, GetContractDto, CreateContractDto } from './dto';

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
  @Get('client/contract/witness/list')
  getAllWitnessContract(@GetCurrentUserId() userId: string) {
    return this.contractSercive.getAllWitnessContract(userId);
  }
  @Post('client/contract')
  @Roles(Role.CLIENT)
  create(@Body() dto: CreateContractDto, @GetCurrentUserId() userId: string) {
    return this.contractSercive.create(dto, userId);
  }
  @Put('client/contract')
  @Roles(Role.CLIENT)
  update(@Body() dto: UpdateContractDto, @GetCurrentUserId() userId: string) {
    return this.contractSercive.update(dto, userId);
  }
}
