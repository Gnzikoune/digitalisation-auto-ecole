import { IsEmail, IsNotEmpty, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsOptional()
  driving_school_id?: string;

  @IsOptional()
  candidate_id?: string;
}
