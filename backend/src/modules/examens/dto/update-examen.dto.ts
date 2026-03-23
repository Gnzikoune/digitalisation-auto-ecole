import { PartialType } from '@nestjs/swagger';
import { CreateExamenDto } from './create-examen.dto';

export class UpdateExamenDto extends PartialType(CreateExamenDto) {}
