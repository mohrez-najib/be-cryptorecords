import { IsNotEmpty, IsString } from 'class-validator';

export class GetDraftDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
