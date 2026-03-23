import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamensService } from './examens.service';
import { ExamensController } from './examens.controller';
import { Exam } from './entities/exam.entity';
import { ExamResult } from './entities/exam-result.entity';
import { Candidate } from '../candidats/entities/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, ExamResult, Candidate])],
  controllers: [ExamensController],
  providers: [ExamensService],
})
export class ExamensModule {}
