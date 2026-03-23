import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Candidate } from '../../candidats/entities/candidate.entity';
import { DrivingSchool } from '../../auto-ecoles/entities/driving-school.entity';
import { Invoice } from './invoice.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ name: 'candidate_id' })
  candidate_id: string;

  @ManyToOne(() => DrivingSchool, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'driving_school_id' })
  driving_school: DrivingSchool;

  @Column({ name: 'driving_school_id' })
  driving_school_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  method: string; // cash, m-pesa, airtel_money, bank_transfer

  @Column({ default: 'completed' })
  status: string; // pending, completed, failed

  @Column({ unique: true, nullable: true })
  reference: string;

  @OneToOne(() => Invoice, (invoice: Invoice) => invoice.payment)
  invoice: Invoice;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date;
}
