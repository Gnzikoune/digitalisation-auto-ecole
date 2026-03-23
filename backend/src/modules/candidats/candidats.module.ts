import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatsService } from './candidats.service';
import { CandidatsController } from './candidats.controller';
import { Candidate } from './entities/candidate.entity';
import { CandidateDocument } from './entities/candidate-document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, CandidateDocument])],
  controllers: [CandidatsController],
  providers: [CandidatsService],
})
export class CandidatsModule {}
