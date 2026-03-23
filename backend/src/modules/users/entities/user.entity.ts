import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DrivingSchool } from '../../auto-ecoles/entities/driving-school.entity';
import { Candidate } from '../../candidats/entities/candidate.entity';

export enum UserRole {
  ADMIN = 'admin',
  SCHOOL_ADMIN = 'school_admin',
  CANDIDATE = 'candidate',
  DGTT_AGENT = 'dgtt_agent',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Ne pas retourner le mot de passe par défaut
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CANDIDATE })
  role: UserRole;

  @Column({ default: true })
  is_active: boolean;

  // Lien optionnel vers une auto-école (si school_admin)
  @ManyToOne(() => DrivingSchool, { nullable: true })
  @JoinColumn({ name: 'driving_school_id' })
  driving_school: DrivingSchool;

  @Column({ name: 'driving_school_id', nullable: true })
  driving_school_id: string;

  // Lien optionnel vers un candidat (si rôle candidat)
  @OneToOne(() => Candidate, { nullable: true })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ name: 'candidate_id', nullable: true })
  candidate_id: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date;
}
