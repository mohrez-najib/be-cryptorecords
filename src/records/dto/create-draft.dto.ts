import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { RowDto } from './body.dto';

export class CreateDraftDto {
  @ValidateNested({ each: true })
  @Type(() => RowDto)
  body: RowDto[];
}
