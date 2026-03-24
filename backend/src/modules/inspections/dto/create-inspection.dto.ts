import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInspectionDto {
  @ApiProperty({ example: '2025-06-15T08:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 'uuid-auto-ecole' })
  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;

  @ApiProperty({
    enum: ['conforme', 'non_conforme', 'sous_observation'],
    example: 'conforme',
  })
  @IsEnum(['conforme', 'non_conforme', 'sous_observation'])
  result: string;

  @ApiPropertyOptional({ example: 'Locaux en très bon état.' })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiProperty({ example: 'uuid-inspector' })
  @IsUUID()
  @IsNotEmpty()
  inspector_id: string;
}
