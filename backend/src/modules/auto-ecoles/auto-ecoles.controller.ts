import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AutoEcolesService } from './auto-ecoles.service';
import { CreateAutoEcoleDto } from './dto/create-auto-ecole.dto';
import { UpdateAutoEcoleDto } from './dto/update-auto-ecole.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('AutoEcoles')
@ApiBearerAuth()
@Controller('modules/auto-ecoles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AutoEcolesController {
  constructor(private readonly autoEcolesService: AutoEcolesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createAutoEcoleDto: CreateAutoEcoleDto) {
    return this.autoEcolesService.create(createAutoEcoleDto);
  }

  @Get()
  findAll() {
    return this.autoEcolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autoEcolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutoEcoleDto: UpdateAutoEcoleDto) {
    return this.autoEcolesService.update(id, updateAutoEcoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autoEcolesService.remove(id);
  }
}
