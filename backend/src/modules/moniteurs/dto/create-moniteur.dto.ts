import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';

export class CreateMoniteurDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  license_number: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(['theorie', 'conduite', 'polyvalent'])
  specialization: string;

  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;
}
