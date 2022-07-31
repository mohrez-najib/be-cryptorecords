import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './Contracts.service';

@Module({
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
