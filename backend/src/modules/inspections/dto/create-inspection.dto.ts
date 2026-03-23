import { IsString, IsNotEmpty, IsUUID, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class CreateInspectionDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;

  @IsEnum(['conforme', 'non_conforme', 'sous_observation'])
  result: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsUUID()
  @IsNotEmpty()
  inspector_id: string;
}
