import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

export class CreateResultatDto {
  @IsUUID()
  @IsNotEmpty()
  candidate_id: string;

  @IsUUID()
  @IsNotEmpty()
  exam_id: string;

  @IsNumber()
  @Min(0)
  @Max(20)
  @IsOptional()
  score?: number;

  @IsEnum(['pass', 'fail', 'absent'])
  @IsNotEmpty()
  result: string;

  @IsString()
  @IsOptional()
  remarks?: string;
}
