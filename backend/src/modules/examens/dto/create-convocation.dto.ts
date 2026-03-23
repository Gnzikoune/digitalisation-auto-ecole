import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateConvocationDto {
  @IsUUID()
  @IsNotEmpty()
  candidate_id: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}
