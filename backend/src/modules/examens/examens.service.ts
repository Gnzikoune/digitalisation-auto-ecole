import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamenDto } from './dto/create-examen.dto';
import { UpdateExamenDto } from './dto/update-examen.dto';
import { CreateResultatDto } from './dto/create-resultat.dto';
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
    if (!exam) throw new NotFoundException('Session d\'examen non trouvée');
    return exam;
  }

  async addResult(createResultatDto: CreateResultatDto): Promise<ExamResult> {
    const { candidate_id, exam_id, result } = createResultatDto;

    // Vérifier l'existence
    const candidate = await this.candidateRepository.findOne({ where: { id: candidate_id } });
    if (!candidate) throw new NotFoundException('Candidat non trouvé');

    const exam = await this.findOne(exam_id);

    const examResult = this.resultRepository.create(createResultatDto);
    const savedResult = await this.resultRepository.save(examResult);

    // Logique de mise à jour du statut candidat
    if (result === 'pass') {
      if (exam.type === 'theory') {
        candidate.status = 'training'; // Admis au code -> Passe à la conduite
      } else if (exam.type === 'practical') {
        candidate.status = 'licensed'; // Admis à la conduite -> Permis obtenu
      }
      await this.candidateRepository.save(candidate);
    } else if (result === 'fail') {
      candidate.status = 'failed';
      await this.candidateRepository.save(candidate);
    }

    return savedResult;
  }

  async remove(id: string): Promise<void> {
    const exam = await this.findOne(id);
    await this.examRepository.softRemove(exam);
  }
}
