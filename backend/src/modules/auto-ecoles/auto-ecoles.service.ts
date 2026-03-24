import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAutoEcoleDto } from './dto/create-auto-ecole.dto';
import { UpdateAutoEcoleDto } from './dto/update-auto-ecole.dto';
import { DrivingSchool } from './entities/driving-school.entity';

@Injectable()
export class AutoEcolesService {
  constructor(
    @InjectRepository(DrivingSchool)
    private readonly drivingSchoolRepository: Repository<DrivingSchool>,
  ) {}

  async create(createAutoEcoleDto: CreateAutoEcoleDto): Promise<DrivingSchool> {
    const school = this.drivingSchoolRepository.create(createAutoEcoleDto);
    return await this.drivingSchoolRepository.save(school);
  }

  async findAll(): Promise<DrivingSchool[]> {
    return await this.drivingSchoolRepository.find();
  }

  async findOne(id: string): Promise<DrivingSchool> {
    const school = await this.drivingSchoolRepository.findOne({
      where: { id },
    });
    if (!school) {
      throw new NotFoundException(`Auto-école avec l'ID ${id} non trouvée`);
    }
    return school;
  }

  async update(
    id: string,
    updateAutoEcoleDto: UpdateAutoEcoleDto,
  ): Promise<DrivingSchool> {
    const school = await this.findOne(id);
    Object.assign(school, updateAutoEcoleDto);
    return await this.drivingSchoolRepository.save(school);
  }

  async remove(id: string): Promise<void> {
    const school = await this.findOne(id);
    await this.drivingSchoolRepository.softRemove(school);
  }
}
