import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  create(@Body() createMoniteurDto: CreateMoniteurDto) {
    return this.moniteursService.create(createMoniteurDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  findAll(@Query('school_id') schoolId: string) {
    return this.moniteursService.findAll(schoolId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  findOne(@Param('id') id: string) {
    return this.moniteursService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  update(@Param('id') id: string, @Body() updateMoniteurDto: UpdateMoniteurDto) {
    return this.moniteursService.update(id, updateMoniteurDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SCHOOL_ADMIN)
  remove(@Param('id') id: string) {
    return this.moniteursService.remove(id);
  }
}
