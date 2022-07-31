import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { RowDto } from './body.dto';

export class UpdateDraftDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @ValidateNested({ each: true })
  @Type(() => RowDto)
  body: RowDto[];
}
