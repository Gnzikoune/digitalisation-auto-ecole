import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'admin@autoecoles.ga' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MotDePasseSecurise123!' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.SCHOOL_ADMIN })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ example: 'uuid-auto-ecole' })
  @IsOptional()
  driving_school_id?: string;

  @ApiPropertyOptional({ example: 'uuid-candidat' })
  @IsOptional()
  candidate_id?: string;
}
