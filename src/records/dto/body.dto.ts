import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

class ElemenetDto {}
class ColDto {
  element: ElemenetDto;
}

export class RowDto {
  @IsNumber()
  @IsNotEmpty()
  colsNumber: number;

  @IsNumber()
  @IsNotEmpty()
  gap: number | string;

  @IsArray()
  @Type(() => ColDto)
  cols: ColDto[];
}
