import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { PartyDto, WitnessDto } from './contract.dto';
import { RowDto } from './index';

export class CreateContractDto {
  @ValidateNested({ each: true })
  @Type(() => PartyDto)
  @ArrayNotEmpty()
  parties: PartyDto[];

  @ValidateNested({ each: true })
  @Type(() => WitnessDto)
  @IsArray()
  witnesses: WitnessDto[];

  @ValidateNested({ each: true })
  @Type(() => RowDto)
  @ArrayNotEmpty()
  body: RowDto[];
}
