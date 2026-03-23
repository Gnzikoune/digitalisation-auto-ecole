import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMoniteurDto {
  @ApiProperty({ example: 'Alice' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Martin' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: 'MONIT-2023-A' })
  @IsString()
  @IsNotEmpty()
  license_number: string;

  @ApiProperty({ example: '+241 07 11 22 33' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ enum: ['theorie', 'conduite', 'polyvalent'], example: 'polyvalent' })
  @IsEnum(['theorie', 'conduite', 'polyvalent'])
  specialization: string;

  @ApiProperty({ example: 'uuid-auto-ecole' })
  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;
}
