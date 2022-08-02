import { IsNotEmpty, IsString } from 'class-validator';

export class GetContractDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
