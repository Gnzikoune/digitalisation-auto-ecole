import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamenDto {
  @ApiProperty({ example: '2025-06-15T08:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 'Centre d\'examen de Libreville' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ enum: ['theory', 'practical'], example: 'theory' })
  @IsEnum(['theory', 'practical'])
  @IsNotEmpty()
  type: string;
}
