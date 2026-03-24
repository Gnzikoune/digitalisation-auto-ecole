import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Candidate } from '../candidats/entities/candidate.entity';
import { Payment } from '../paiements/entities/payment.entity';
import { ExamResult } from '../examens/entities/exam-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Payment, ExamResult])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
