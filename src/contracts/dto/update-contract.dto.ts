import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PartyDto, WitnessDto } from './contract.dto';
import { RowDto } from './draft-body.dto';

export class UpdateContractDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @ValidateNested({ each: true })
  @Type(() => PartyDto)
  @ArrayNotEmpty()
  parties: PartyDto[];

  @ValidateNested({ each: true })
  @Type(() => WitnessDto)
  @IsArray()
  witnesses: WitnessDto[];

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ValidateNested({ each: true })
  @Type(() => RowDto)
  body: RowDto[];
}
