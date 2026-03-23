import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutoEcolesService } from './auto-ecoles.service';
import { CreateAutoEcoleDto } from './dto/create-auto-ecole.dto';
import { UpdateAutoEcoleDto } from './dto/update-auto-ecole.dto';

@Controller('modules/auto-ecoles')
export class AutoEcolesController {
  constructor(private readonly autoEcolesService: AutoEcolesService) {}

  @Post()
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
