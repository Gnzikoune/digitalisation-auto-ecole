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
import { User } from '../../users/entities/user.entity';

@Entity('inspections')
export class Inspection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => DrivingSchool)
  @JoinColumn({ name: 'driving_school_id' })
  driving_school: DrivingSchool;

  @Column()
  driving_school_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'inspector_id' })
  inspector: User;

  @Column()
  inspector_id: string; // L'agent DGTT qui a fait l'inspection

  @Column({
    type: 'enum',
    enum: ['conforme', 'non_conforme', 'sous_observation'],
    default: 'conforme',
  })
  result: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
