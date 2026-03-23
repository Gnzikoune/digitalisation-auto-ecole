import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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
  @Roles(UserRole.ADMIN, UserRole.DGTT_AGENT)
  create(@Body() createInspectionDto: CreateInspectionDto) {
    return this.inspectionsService.create(createInspectionDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DGTT_AGENT, UserRole.SCHOOL_ADMIN)
  findAll(@Query('school_id') schoolId: string, @Req() req: any) {
    // Un gérant d'auto-école ne peut voir que les inspections de son établissement
    if (req.user.role === UserRole.SCHOOL_ADMIN && req.user.driving_school_id) {
       return this.inspectionsService.findAll(req.user.driving_school_id);
    }
    return this.inspectionsService.findAll(schoolId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.DGTT_AGENT, UserRole.SCHOOL_ADMIN)
  findOne(@Param('id') id: string) {
    return this.inspectionsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateInspectionDto: UpdateInspectionDto) {
    return this.inspectionsService.update(id, updateInspectionDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.inspectionsService.remove(id);
  }
}
