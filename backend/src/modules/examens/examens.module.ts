import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamensService } from './examens.service';
import { ExamensController } from './examens.controller';
import { Exam } from './entities/exam.entity';
import { ExamResult } from './entities/exam-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, ExamResult])],
  controllers: [ExamensController],
  providers: [ExamensService],
})
export class ExamensModule {}
