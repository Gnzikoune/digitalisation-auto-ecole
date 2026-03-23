import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from '../candidats/entities/candidate.entity';
import { Payment } from '../paiements/entities/payment.entity';
import { ExamResult } from '../examens/entities/exam-result.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(ExamResult)
    private readonly examResultRepository: Repository<ExamResult>,
  ) {}

  async getOverview() {
    const totalCandidates = await this.candidateRepository.count();
    const totalPayments = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .getRawOne();

    return {
      total_candidates: totalCandidates,
      total_revenue: parseFloat(totalPayments.total || 0),
    };
  }

  async getSuccessRate() {
    const totalExams = await this.examResultRepository.count();
    const passedExams = await this.examResultRepository.count({
      where: { result: 'admis' },
    });

    return {
      total_exams: totalExams,
      passed_exams: passedExams,
      rate: totalExams > 0 ? (passedExams / totalExams) * 100 : 0,
    };
  }

  async getMonthlyInscriptions() {
    const stats = await this.candidateRepository
      .createQueryBuilder('candidate')
      .select("TO_CHAR(candidate.created_at, 'YYYY-MM')", 'month')
      .addSelect('COUNT(candidate.id)', 'count')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    return stats;
  }
}
