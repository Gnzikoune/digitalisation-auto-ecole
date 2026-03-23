import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { DrivingSchoolDocument } from './driving-school-document.entity';
// Entité principale pour la gestion des auto-écoles

@Entity('driving_schools')
export class DrivingSchool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'legal_name' })
  legal_name: string;

  @Column({ name: 'commercial_name', nullable: true })
  commercial_name: string;

  @Column({ name: 'approval_number', unique: true })
  approval_number: string;

  @Column({ type: 'date', name: 'approval_issue_date', nullable: true })
  approval_issue_date: Date;

  @Column({ type: 'date', name: 'approval_expiry_date', nullable: true })
  approval_expiry_date: Date;

  @Column({ default: 'active' })
  status: string; // active, suspended, closed

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'double precision', nullable: true })
  gps_lat: number;

  @Column({ type: 'double precision', nullable: true })
  gps_lng: number;

  @Column({ type: 'integer', nullable: true })
  capacity: number;

  @OneToMany(() => DrivingSchoolDocument, (doc: DrivingSchoolDocument) => doc.driving_school)
  documents: DrivingSchoolDocument[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date;
}
