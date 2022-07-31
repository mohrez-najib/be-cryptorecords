import { Module } from '@nestjs/common';
import { DraftsController } from './draft.controller';
import { DraftsService } from './drafts.service';

@Module({
  controllers: [DraftsController],
  providers: [DraftsService],
})
export class DraftsModule {}
