import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConvocationDto {
  @ApiProperty({ example: 'uuid-candidat' })
  @IsUUID()
  @IsNotEmpty()
  candidate_id: string;

  @ApiProperty({ example: '2025-06-15T08:00:00.000Z' })
  @IsString()
  @IsNotEmpty()
  date: string;
}
