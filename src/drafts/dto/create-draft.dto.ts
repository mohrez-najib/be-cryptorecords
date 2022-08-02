import { Type } from 'class-transformer';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { RowDto } from './index';

export class CreateDraftDto {
  @ValidateNested({ each: true })
  @Type(() => RowDto)
  @ArrayNotEmpty()
  body: RowDto[];
}
