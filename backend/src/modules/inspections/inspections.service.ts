/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { Inspection } from './entities/inspection.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectRepository(Inspection)
    private readonly inspectionRepository: Repository<Inspection>,
  ) {}

  create(createInspectionDto: CreateInspectionDto, inspectorId: string) {
    const inspection = this.inspectionRepository.create({
      ...createInspectionDto,
      inspector_id: inspectorId,
    });
    return this.inspectionRepository.save(inspection);
  }

  findAll(user: Record<string, string>) {
    const query = this.inspectionRepository
      .createQueryBuilder('inspection')
      .leftJoinAndSelect('inspection.driving_school', 'school')
      .leftJoinAndSelect('inspection.inspector', 'inspector');

    // Filtrage automatique : une auto-école ne voit que ses inspections
    if (user.role === UserRole.SCHOOL_ADMIN) {
      query.where('inspection.driving_school_id = :schoolId', {
        schoolId: user.school_id,
      });
    }

    return query.getMany();
  }

  async findOne(id: string, user: Record<string, string>) {
    const inspection = await this.inspectionRepository.findOne({
      where: { id },
      relations: ['driving_school', 'inspector'],
    });
    if (!inspection) {
      throw new NotFoundException(`Inspection #${id} non trouvée`);
    }

    // Sécurité : Vérifier le droit d'accès
    if (
      user.role === UserRole.SCHOOL_ADMIN &&
      inspection.driving_school_id !== user.school_id
    ) {
      throw new NotFoundException(`Inspection #${id} non trouvée`);
    }

    return inspection;
  }

  async update(id: string, updateInspectionDto: UpdateInspectionDto) {
    const inspection = await this.inspectionRepository.findOne({
      where: { id },
    });
    if (!inspection) throw new NotFoundException('Inspection non trouvée');
    this.inspectionRepository.merge(inspection, updateInspectionDto);
    return this.inspectionRepository.save(inspection);
  }

  async remove(id: string) {
    const inspection = await this.inspectionRepository.findOne({
      where: { id },
    });
    if (!inspection) throw new NotFoundException('Inspection non trouvée');
    return this.inspectionRepository.softRemove(inspection);
  }
}
