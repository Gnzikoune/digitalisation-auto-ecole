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
import { DrivingSchool } from '../../auto-ecoles/entities/driving-school.entity';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  license_number: string; // Certification nationale de moniteur

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: ['theorie', 'conduite', 'polyvalent'],
    default: 'polyvalent',
  })
  specialization: string;

  @ManyToOne(() => DrivingSchool)
  @JoinColumn({ name: 'driving_school_id' })
  driving_school: DrivingSchool;

  @Column()
  driving_school_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
