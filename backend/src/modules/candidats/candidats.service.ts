import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidatsService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  async create(createCandidatDto: CreateCandidatDto): Promise<Candidate> {
    const candidate = this.candidateRepository.create(createCandidatDto);
    return await this.candidateRepository.save(candidate);
  }

  async findAll(): Promise<Candidate[]> {
    return await this.candidateRepository.find({
      relations: ['driving_school'],
    });
  }

  async findBySchool(schoolId: string): Promise<Candidate[]> {
    return await this.candidateRepository.find({
      where: { driving_school_id: schoolId },
      relations: ['driving_school'],
    });
  }

  async findOne(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
      relations: ['driving_school', 'documents'],
    });
    if (!candidate) {
      throw new NotFoundException(`Candidat avec l'ID ${id} non trouvé`);
    }
    return candidate;
  }

  async update(
    id: string,
    updateCandidatDto: UpdateCandidatDto,
  ): Promise<Candidate> {
    const candidate = await this.findOne(id);
    Object.assign(candidate, updateCandidatDto);
    return await this.candidateRepository.save(candidate);
  }

  async remove(id: string): Promise<void> {
    const candidate = await this.findOne(id);
    await this.candidateRepository.softRemove(candidate);
  }
}
