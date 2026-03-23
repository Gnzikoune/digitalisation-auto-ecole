import { IsString, IsNotEmpty, IsOptional, IsEmail, IsInt, Min, IsDateString } from 'class-validator';

export class CreateAutoEcoleDto {
  @IsString()
  @IsNotEmpty()
  legal_name: string;

  @IsString()
  @IsOptional()
  commercial_name?: string;

  @IsString()
  @IsNotEmpty()
  approval_number: string;

  @IsDateString()
  @IsOptional()
  approval_issue_date?: string;

  @IsDateString()
  @IsOptional()
  approval_expiry_date?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  capacity?: number;
}
