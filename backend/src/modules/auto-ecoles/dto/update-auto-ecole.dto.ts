import { PartialType } from '@nestjs/mapped-types';
import { CreateAutoEcoleDto } from './create-auto-ecole.dto';

export class UpdateAutoEcoleDto extends PartialType(CreateAutoEcoleDto) {}
