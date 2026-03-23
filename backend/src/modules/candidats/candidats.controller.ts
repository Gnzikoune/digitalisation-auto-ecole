import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CandidatsService } from './candidats.service';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('modules/candidats')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CandidatsController {
  constructor(private readonly candidatsService: CandidatsService) {}

  @Post()
  create(@Body() createCandidatDto: CreateCandidatDto) {
    return this.candidatsService.create(createCandidatDto);
  }

  @Get()
  findAll() {
    return this.candidatsService.findAll();
  }

  @Get('auto-ecole/:schoolId')
  findBySchool(@Param('schoolId') schoolId: string) {
    return this.candidatsService.findBySchool(schoolId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidatDto: UpdateCandidatDto) {
    return this.candidatsService.update(id, updateCandidatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatsService.remove(id);
  }
}
