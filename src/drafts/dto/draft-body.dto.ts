import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ElemenetDto {}
class ColDto {
  @IsString()
  @IsOptional()
  span: string;

  @IsString()
  @IsOptional()
  start: string;

  @IsString()
  @IsOptional()
  end: string;

  @IsObject()
  @IsOptional()
  element: ElemenetDto;
}

export class RowDto {
  @IsNumber()
  @IsNotEmpty()
  colsNumber: number;

  @IsNumber()
  @IsNotEmpty()
  gap: number | string;

  @ValidateNested({ each: true })
  @Type(() => ColDto)
  @IsArray()
  @ArrayNotEmpty()
  cols: ColDto[];
}
