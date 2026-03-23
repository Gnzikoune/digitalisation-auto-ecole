import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { InspectionsService } from './inspections.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Inspections')
@ApiBearerAuth()
@Controller('modules/inspections')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Post()
  @ApiOperation({ summary: "Créer un nouveau rapport d'inspection (Agent DGTT seul)" })
  @Roles(UserRole.DGTT_AGENT, UserRole.ADMIN)
  @ApiResponse({ status: 201, description: "Rapport créé." })
  create(@Body() createInspectionDto: CreateInspectionDto, @Req() req: any) {
    return this.inspectionsService.create(createInspectionDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: "Lister les inspections (filtrage par rôle automatique)" })
  findAll(@Req() req: any) {
    return this.inspectionsService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: "Voir les détails d'un rapport de conformité" })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.inspectionsService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Modifier un rapport (Agent DGTT seul)" })
  @Roles(UserRole.DGTT_AGENT, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateInspectionDto: UpdateInspectionDto) {
    return this.inspectionsService.update(id, updateInspectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Suppression logique d'un rapport" })
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.inspectionsService.remove(id);
  }
}
