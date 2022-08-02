import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class PartyDto {
  @IsString()
  @IsNotEmpty()
  personId: string;

  @IsBoolean()
  @IsNotEmpty()
  signRequired: boolean;
}

export class WitnessDto {
  @IsString()
  @IsNotEmpty()
  personId: string;

  @IsBoolean()
  @IsNotEmpty()
  signRequired: boolean;
}
