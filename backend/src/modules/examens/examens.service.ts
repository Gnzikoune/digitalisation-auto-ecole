import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamenDto } from './dto/create-examen.dto';
import { UpdateExamenDto } from './dto/update-examen.dto';
import { CreateConvocationDto } from './dto/create-convocation.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Exam } from './entities/exam.entity';
import { ExamResult } from './entities/exam-result.entity';
import { Candidate } from '../candidats/entities/candidate.entity';

@Injectable()
export class ExamensService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    @InjectRepository(ExamResult)
    private readonly resultRepository: Repository<ExamResult>,
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  async create(createExamenDto: CreateExamenDto): Promise<Exam> {
    const exam = this.examRepository.create(createExamenDto);
    return await this.examRepository.save(exam);
  }

  async findAll(): Promise<Exam[]> {
    return await this.examRepository.find({ relations: ['results'] });
  }

  async findOne(id: string): Promise<Exam> {
    const exam = await this.examRepository.findOne({
      where: { id },
      relations: ['results', 'results.candidate'],
    });
    if (!exam) throw new NotFoundException("Session d'examen non trouvée");
    return exam;
  }

  async update(id: string, updateExamenDto: UpdateExamenDto): Promise<Exam> {
    const exam = await this.findOne(id);
    this.examRepository.merge(exam, updateExamenDto);
    return await this.examRepository.save(exam);
  }

  async createConvocation(examId: string, dto: CreateConvocationDto): Promise<ExamResult> {
    const result = this.resultRepository.create({
      candidate_id: dto.candidate_id,
      exam_id: examId,
      result: 'pending'
    });
    return await this.resultRepository.save(result);
  }

  async updateResult(id: string, dto: UpdateResultDto): Promise<ExamResult> {
    const resultEntry = await this.resultRepository.findOne({ 
      where: { id },
      relations: ['candidate', 'exam']
    });
    if (!resultEntry) throw new NotFoundException("Ligne de résultat non trouvée");

    this.resultRepository.merge(resultEntry, dto);
    const saved = await this.resultRepository.save(resultEntry);

    if (dto.result === 'pass') {
      const candidate = resultEntry.candidate;
      if (resultEntry.exam.type === 'theory') {
        candidate.status = 'training';
      } else {
        candidate.status = 'licensed';
      }
      await this.candidateRepository.save(candidate);
    }

    return saved;
  }

  async remove(id: string): Promise<void> {
    const exam = await this.findOne(id);
    await this.examRepository.softRemove(exam);
  }
}
