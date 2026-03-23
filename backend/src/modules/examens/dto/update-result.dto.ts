import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResultDto {
  @ApiProperty({ enum: ['pending', 'pass', 'fail'], example: 'pass' })
  @IsEnum(['pending', 'pass', 'fail'])
  @IsNotEmpty()
  result: string;

  @ApiProperty({ example: 'Mention très bien.' })
  @IsString()
  @IsNotEmpty()
  remarks: string;
}
