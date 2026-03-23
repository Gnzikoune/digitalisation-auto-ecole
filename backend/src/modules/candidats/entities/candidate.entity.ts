import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DrivingSchool } from '../../auto-ecoles/entities/driving-school.entity';
import { CandidateDocument } from './candidate-document.entity';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  first_name: string;

  @Column({ name: 'last_name' })
  last_name: string;

  @Column({ type: 'date', name: 'birth_date', nullable: true })
  birth_date: Date;

  @Column({ name: 'birth_place', nullable: true })
  birth_place: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'id_card_number', unique: true, nullable: true })
  id_card_number: string;

  @Column({ default: 'registered' })
  status: string; // registered, training, exam_ready, licensed, failed

  @ManyToOne(() => DrivingSchool, { nullable: false })
  @JoinColumn({ name: 'driving_school_id' })
  driving_school: DrivingSchool;

  @Column({ name: 'driving_school_id' })
  driving_school_id: string;

  @OneToMany(() => CandidateDocument, (doc: CandidateDocument) => doc.candidate)
  documents: CandidateDocument[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date;
}
