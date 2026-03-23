import { PartialType } from '@nestjs/swagger';
import { CreateAutoEcoleDto } from './create-auto-ecole.dto';

export class UpdateAutoEcoleDto extends PartialType(CreateAutoEcoleDto) {}
