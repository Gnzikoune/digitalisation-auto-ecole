import { IsString, IsNotEmpty, IsOptional, IsEmail, IsInt, Min, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAutoEcoleDto {
  @ApiProperty({ example: 'Auto-École de la Paix' })
  @IsString()
  @IsNotEmpty()
  legal_name: string;

  @ApiProperty({ example: 'AE Paix', required: false })
  @IsString()
  @IsOptional()
  commercial_name?: string;

  @ApiProperty({ example: 'AE-2023-001' })
  @IsString()
  @IsNotEmpty()
  approval_number: string;

  @ApiProperty({ example: '2023-01-01', required: false })
  @IsDateString()
  @IsOptional()
  approval_issue_date?: string;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsDateString()
  @IsOptional()
  approval_expiry_date?: string;

  @ApiProperty({ example: 'Boulevard Triomphal, Libreville', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'Libreville', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 20, required: false })
  @IsInt()
  @IsOptional()
  @Min(1)
  capacity?: number;
}
