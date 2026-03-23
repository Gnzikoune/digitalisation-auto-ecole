import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';

export class CreateExamenDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(['theory', 'practical'])
  @IsNotEmpty()
  type: string;
}
