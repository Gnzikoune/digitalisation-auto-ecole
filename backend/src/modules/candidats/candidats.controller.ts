import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CandidatsService } from './candidats.service';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Candidats')
@ApiBearerAuth()
@Controller('modules/candidats')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CandidatsController {
  constructor(private readonly candidatsService: CandidatsService) {}

  @Post()
  @ApiOperation({ summary: 'Enregistrer un nouveau candidat' })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  create(@Body() createCandidatDto: CreateCandidatDto) {
    return this.candidatsService.create(createCandidatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les candidats (Admin seul)' })
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.candidatsService.findAll();
  }

  @Get('auto-ecole/:schoolId')
  @ApiOperation({ summary: "Lister les candidats d'une auto-école spécifique" })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  findBySchool(@Param('schoolId') schoolId: string) {
    return this.candidatsService.findBySchool(schoolId);
  }

  @Get(':id')
  @ApiOperation({ summary: "Récupérer les détails d'un candidat par ID" })
  findOne(@Param('id') id: string) {
    return this.candidatsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Mettre à jour les informations d'un candidat" })
  update(
    @Param('id') id: string,
    @Body() updateCandidatDto: UpdateCandidatDto,
  ) {
    return this.candidatsService.update(id, updateCandidatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Suppression logique d'un candidat" })
  remove(@Param('id') id: string) {
    return this.candidatsService.remove(id);
  }
}
