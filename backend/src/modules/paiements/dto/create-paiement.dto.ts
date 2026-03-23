import { IsString, IsNotEmpty, IsNumber, Min, IsUUID, IsOptional, IsEnum } from 'class-validator';

export class CreatePaiementDto {
  @IsUUID()
  @IsNotEmpty()
  candidate_id: string;

  @IsUUID()
  @IsNotEmpty()
  driving_school_id: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsEnum(['cash', 'm-pesa', 'airtel_money', 'bank_transfer'])
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsOptional()
  reference?: string;
}
