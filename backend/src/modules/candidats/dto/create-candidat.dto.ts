import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCandidatDto {
  @ApiProperty({ example: 'Jean' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: '1995-05-15', required: false })
  @IsDateString()
  @IsOptional()
  birth_date?: string;

  @ApiProperty({ example: 'Libreville', required: false })
  @IsString()
  @IsOptional()
  birth_place?: string;

  @ApiProperty({ example: 'M', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: 'Quartier Akanda', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: '+241 07 00 00 00', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'jean.dupont@email.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'GAB12345678', required: false })
  @IsString()
  @IsOptional()
  id_card_number?: string;

  @ApiProperty({ example: 'uuid-auto-ecole' })
  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;
}
