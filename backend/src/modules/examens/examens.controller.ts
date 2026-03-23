import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExamensService } from './examens.service';
import { CreateExamenDto } from './dto/create-examen.dto';
import { UpdateExamenDto } from './dto/update-examen.dto';
import { CreateResultatDto } from './dto/create-resultat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('modules/examens')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamensController {
  constructor(private readonly examensService: ExamensService) {}

  @Post()
  create(@Body() createExamenDto: CreateExamenDto) {
    return this.examensService.create(createExamenDto);
  }

  @Post('results')
  addResult(@Body() createResultatDto: CreateResultatDto) {
    return this.examensService.addResult(createResultatDto);
  }

  @Get()
  findAll() {
    return this.examensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examensService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examensService.remove(id);
  }
}
