import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { Payment } from './entities/payment.entity';
import { Invoice } from './entities/invoice.entity';
import { Candidate } from '../candidats/entities/candidate.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class PaiementsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    private readonly auditService: AuditService,
  ) {}

  async create(createPaiementDto: CreatePaiementDto) {
    const payment = this.paymentRepository.create(createPaiementDto);
    const savedPayment = await this.paymentRepository.save(payment);

    // Génération automatique de facture
    const invoice = this.invoiceRepository.create({
      payment: savedPayment,
      invoice_number: `INV-${Date.now()}`,
      total_amount: savedPayment.amount,
      due_date: new Date(),
    });
    await this.invoiceRepository.save(invoice);

    // Audit Log
    await this.auditService.log({
      action: 'CREATE_PAYMENT',
      entity_name: 'Payment',
      entity_id: savedPayment.id,
      new_values: createPaiementDto,
    });

    return savedPayment;
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: ['candidate', 'invoice'],
    });
  }

  async findByCandidate(candidateId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { candidate_id: candidateId },
      relations: ['invoice'],
    });
  }

  async getBalance(candidateId: string): Promise<any> {
    const candidate = await this.candidateRepository.findOne({
      where: { id: candidateId },
    });
    if (!candidate) throw new NotFoundException('Candidat non trouvé');

    const payments = await this.findByCandidate(candidateId);
    const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);

    // Prix fictif pour l'exemple (à dynamiser plus tard avec une grille tarifaire)
    const trainingPrice = 150000;
    const balance = trainingPrice - totalPaid;

    return {
      total_training: trainingPrice,
      total_paid: totalPaid,
      remaining: balance,
    };
  }

  async remove(id: string): Promise<void> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) throw new NotFoundException('Paiement non trouvé');
    await this.paymentRepository.softRemove(payment);
  }
}
