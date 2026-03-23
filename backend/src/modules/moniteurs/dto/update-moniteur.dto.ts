import { PartialType } from '@nestjs/mapped-types';
import { CreateMoniteurDto } from './create-moniteur.dto';

export class UpdateMoniteurDto extends PartialType(CreateMoniteurDto) {}
