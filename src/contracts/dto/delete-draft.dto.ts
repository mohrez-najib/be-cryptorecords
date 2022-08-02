import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteDraftDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
