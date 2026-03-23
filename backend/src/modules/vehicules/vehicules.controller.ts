import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { VehiculesService } from './vehicules.service';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Vehicules')
@ApiBearerAuth()
@Controller('modules/vehicules')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehiculesController {
  constructor(private readonly vehiculesService: VehiculesService) {}

  @Post()
  @ApiOperation({ summary: 'Enregistrer un nouveau véhicule dans le parc' })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  create(@Body() createVehiculeDto: CreateVehiculeDto) {
    return this.vehiculesService.create(createVehiculeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les véhicules (filtrable par auto-école)' })
  findAll(@Query('driving_school_id') schoolId?: string) {
    return this.vehiculesService.findAll(schoolId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails techniques d'un véhicule' })
  findOne(@Param('id') id: string) {
    return this.vehiculesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un véhicule' })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  update(@Param('id') id: string, @Body() updateVehiculeDto: UpdateVehiculeDto) {
    return this.vehiculesService.update(id, updateVehiculeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un véhicule du parc' })
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  remove(@Param('id') id: string) {
    return this.vehiculesService.remove(id);
  }
}
