import { PartialType } from '@nestjs/swagger';
import { CreateMoniteurDto } from './create-moniteur.dto';

export class UpdateMoniteurDto extends PartialType(CreateMoniteurDto) {}
