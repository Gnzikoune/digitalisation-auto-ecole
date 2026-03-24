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

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string; // Marque (ex: Toyota)

  @Column()
  model: string; // Modèle (ex: Yaris)

  @Column({ unique: true })
  license_plate: string; // Immatriculation

  @Column()
  category: string; // B, C, D...

  @Column({ nullable: true })
  insurance_info: string;

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
