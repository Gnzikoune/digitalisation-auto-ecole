import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { MoniteursService } from './moniteurs.service';
import { CreateMoniteurDto } from './dto/create-moniteur.dto';
import { UpdateMoniteurDto } from './dto/update-moniteur.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Moniteurs')
@ApiBearerAuth()
@Controller('modules/moniteurs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MoniteursController {
  constructor(private readonly moniteursService: MoniteursService) {}

  @Post()
  @ApiOperation({ summary: "Enregistrer un nouvel instructeur" })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  create(@Body() createMoniteurDto: CreateMoniteurDto) {
    return this.moniteursService.create(createMoniteurDto);
  }

  @Get()
  @ApiOperation({ summary: "Lister les moniteurs (filtrable par auto-école)" })
  findAll(@Query('driving_school_id') schoolId?: string) {
    return this.moniteursService.findAll(schoolId);
  }

  @Get(':id')
  @ApiOperation({ summary: "Récupérer le profil complet d'un moniteur" })
  findOne(@Param('id') id: string) {
    return this.moniteursService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Mettre à jour un moniteur" })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  update(@Param('id') id: string, @Body() updateMoniteurDto: UpdateMoniteurDto) {
    return this.moniteursService.update(id, updateMoniteurDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Archiver un moniteur (Soft delete)" })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  remove(@Param('id') id: string) {
    return this.moniteursService.remove(id);
  }
}
