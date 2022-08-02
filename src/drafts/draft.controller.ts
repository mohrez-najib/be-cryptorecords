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
import { DraftsService } from './drafts.service';
import {
  CreateDraftDto,
  UpdateDraftDto,
  DeleteDraftDto,
  GetDraftDto,
} from './dto';

@Controller()
export class DraftsController {
  constructor(private draftSercive: DraftsService) {}

  @Get('client/draft')
  getOne(@Query() dto: GetDraftDto) {
    return this.draftSercive.getOne(dto);
  }
  @Get('client/draft/list')
  getAll(@GetCurrentUserId() userId: string) {
    return this.draftSercive.getAll(userId);
  }
  @Post('client/draft')
  @Roles(Role.CLIENT)
  create(@Body() dto: CreateDraftDto, @GetCurrentUserId() userId: string) {
    return this.draftSercive.create(dto, userId);
  }
  @Put('client/draft')
  @Roles(Role.CLIENT)
  update(@Body() dto: UpdateDraftDto) {
    return this.draftSercive.update(dto);
  }

  @Delete('client/draft')
  @Roles(Role.CLIENT)
  delete(@Body() dto: DeleteDraftDto) {
    return this.draftSercive.delete(dto);
  }
}
