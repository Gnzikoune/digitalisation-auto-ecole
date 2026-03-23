import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateVehiculeDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @IsString()
  @IsNotEmpty()
  category: string; // B, C, D...

  @IsString()
  @IsOptional()
  insurance_info?: string;

  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;
}
