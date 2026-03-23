import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateResultDto {
  @IsEnum(['pending', 'pass', 'fail'])
  @IsNotEmpty()
  result: string;

  @IsString()
  @IsNotEmpty()
  remarks: string;
}
