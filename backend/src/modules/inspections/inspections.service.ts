import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { Inspection } from './entities/inspection.entity';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectRepository(Inspection)
    private readonly inspectionRepository: Repository<Inspection>,
  ) {}

  create(createInspectionDto: CreateInspectionDto) {
    const inspection = this.inspectionRepository.create(createInspectionDto);
    return this.inspectionRepository.save(inspection);
  }

  findAll(schoolId?: string) {
    const query = this.inspectionRepository.createQueryBuilder('inspection')
      .leftJoinAndSelect('inspection.driving_school', 'school')
      .leftJoinAndSelect('inspection.inspector', 'inspector');

    if (schoolId) {
      query.where('inspection.driving_school_id = :schoolId', { schoolId });
    }

    return query.getMany();
  }

  async findOne(id: string) {
    const inspection = await this.inspectionRepository.findOne({
      where: { id },
      relations: ['driving_school', 'inspector'],
    });
    if (!inspection) {
      throw new NotFoundException(`Inspection #${id} non trouvée`);
    }
    return inspection;
  }

  async update(id: string, updateInspectionDto: UpdateInspectionDto) {
    const inspection = await this.findOne(id);
    this.inspectionRepository.merge(inspection, updateInspectionDto);
    return this.inspectionRepository.save(inspection);
  }

  async remove(id: string) {
    const inspection = await this.findOne(id);
    return this.inspectionRepository.softRemove(inspection);
  }
}
