import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DrivingSchool } from './driving-school.entity';

@Entity('driving_school_documents')
export class DrivingSchoolDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DrivingSchool, (school) => school.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'driving_school_id' })
  driving_school: DrivingSchool;

  @Column({ name: 'doc_type' })
  doc_type: string; // agrément, assurance, autorisation, inspection

  @Column({ name: 'file_url' })
  file_url: string;

  @Column({ type: 'date', name: 'issue_date', nullable: true })
  issue_date: Date;

  @Column({ type: 'date', name: 'expiry_date', nullable: true })
  expiry_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date;
}
