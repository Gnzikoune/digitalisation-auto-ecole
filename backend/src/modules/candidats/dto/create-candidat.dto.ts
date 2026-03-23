import { IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDateString } from 'class-validator';

export class CreateCandidatDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsDateString()
  @IsOptional()
  birth_date?: string;

  @IsString()
  @IsOptional()
  birth_place?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  id_card_number?: string;

  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;
}
