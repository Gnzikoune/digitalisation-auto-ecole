import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaiementsService } from './paiements.service';
import { PaiementsController } from './paiements.controller';
import { Payment } from './entities/payment.entity';
import { Invoice } from './entities/invoice.entity';
import { Candidate } from '../candidats/entities/candidate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Invoice, Candidate]),
    CandidatsModule,
  ],
  controllers: [PaiementsController],
  providers: [PaiementsService],
})
export class PaiementsModule {}
