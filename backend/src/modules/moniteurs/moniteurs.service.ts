import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMoniteurDto } from './dto/create-moniteur.dto';
import { UpdateMoniteurDto } from './dto/update-moniteur.dto';
import { Instructor } from './entities/moniteur.entity';

@Injectable()
export class MoniteursService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
  ) {}

  create(createMoniteurDto: CreateMoniteurDto) {
    const instructor = this.instructorRepository.create(createMoniteurDto);
    return this.instructorRepository.save(instructor);
  }

  findAll(schoolId?: string) {
    if (schoolId) {
      return this.instructorRepository.find({
        where: { driving_school_id: schoolId },
      });
    }
    return this.instructorRepository.find({ relations: ['driving_school'] });
  }

  async findOne(id: string) {
    const instructor = await this.instructorRepository.findOne({
      where: { id },
      relations: ['driving_school'],
    });
    if (!instructor) {
      throw new NotFoundException(`Moniteur #${id} non trouvé`);
    }
    return instructor;
  }

  async update(id: string, updateMoniteurDto: UpdateMoniteurDto) {
    const instructor = await this.findOne(id);
    this.instructorRepository.merge(instructor, updateMoniteurDto);
    return this.instructorRepository.save(instructor);
  }

  async remove(id: string) {
    const instructor = await this.findOne(id);
    return this.instructorRepository.softRemove(instructor);
  }
}
