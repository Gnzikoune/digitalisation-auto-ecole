import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsUUID,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaiementDto {
  @ApiProperty({ example: 'uuid-candidat' })
  @IsUUID()
  @IsNotEmpty()
  candidate_id: string;

  @ApiProperty({ example: 'uuid-auto-ecole' })
  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;

  @ApiProperty({ example: 150000, description: 'Montant en FCFA' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    enum: ['cash', 'm-pesa', 'airtel_money', 'bank_transfer'],
    example: 'cash',
  })
  @IsEnum(['cash', 'm-pesa', 'airtel_money', 'bank_transfer'])
  @IsNotEmpty()
  method: string;

  @ApiPropertyOptional({ example: 'REF-PAIE-001' })
  @IsString()
  @IsOptional()
  reference?: string;
}
