import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ExamensService } from './examens.service';
import { CreateExamenDto } from './dto/create-examen.dto';
import { UpdateExamenDto } from './dto/update-examen.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { CreateConvocationDto } from './dto/create-convocation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Examens')
@ApiBearerAuth()
@Controller('modules/examens')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamensController {
  constructor(private readonly examensService: ExamensService) {}

  @Post()
  @ApiOperation({ summary: "Créer une nouvelle session d'examen" })
  @Roles(UserRole.ADMIN)
  create(@Body() createExamenDto: CreateExamenDto) {
    return this.examensService.create(createExamenDto);
  }

  @Get()
  @ApiOperation({ summary: "Lister toutes les sessions d'examens" })
  findAll() {
    return this.examensService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Récupérer les détails d'une session d'examen" })
  findOne(@Param('id') id: string) {
    return this.examensService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une session' })
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateExamenDto: UpdateExamenDto) {
    return this.examensService.update(id, updateExamenDto);
  }

  @Post(':id/convocations')
  @ApiOperation({ summary: "Convoquer un candidat à une session d'examen" })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  createConvocation(@Param('id') id: string, @Body() createConvocationDto: CreateConvocationDto) {
    return this.examensService.createConvocation(id, createConvocationDto);
  }

  @Patch('results/:id')
  @ApiOperation({ summary: "Saisir ou modifier le résultat d'un candidat" })
  @Roles(UserRole.ADMIN)
  updateResult(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.examensService.updateResult(id, updateResultDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Supprimer une session d'examen (Admin seul)" })
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.examensService.remove(id);
  }
}
