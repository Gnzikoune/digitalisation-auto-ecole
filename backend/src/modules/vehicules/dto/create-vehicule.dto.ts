import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehiculeDto {
  @ApiProperty({ example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({ example: 'Yaris' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'AB-123-CD' })
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @ApiProperty({ example: 'B', description: 'Catégorie de permis (B, C, D...)' })
  @IsString()
  @IsNotEmpty()
  category: string; // B, C, D...

  @ApiPropertyOptional({ example: 'Assistance 24/7 N° Police 9988' })
  @IsString()
  @IsOptional()
  insurance_info?: string;

  @ApiProperty({ example: 'uuid-auto-ecole' })
  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;
}
