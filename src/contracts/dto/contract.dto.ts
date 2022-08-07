import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PartyDto {
  @IsString()
  @IsNotEmpty()
  personId: string;

  @IsDateString()
  @IsOptional()
  signedAt: string;

  @IsBoolean()
  @IsNotEmpty()
  signRequired: boolean;
}

export class WitnessDto {
  @IsString()
  @IsNotEmpty()
  personId: string;

  @IsDateString()
  @IsOptional()
  signedAt: string;

  @IsBoolean()
  @IsNotEmpty()
  signRequired: boolean;
}
