import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Student } from './student.entity';
import { AssessmentDetail } from './assessmentDetail.entity';

@Entity()
export class FormInTP08 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  score1_1: string;
  @Column({ nullable: true })
  score1_2: string;
  @Column({ nullable: true })
  score1_3: string;
  @Column({ nullable: true })
  score1_4: string;
  @Column({ nullable: true })
  score1_5: string;
  @Column({ nullable: true })
  score2_1: string;
  @Column({ nullable: true })
  score2_2: string;
  @Column({ nullable: true })
  score2_3: string;
  @Column({ nullable: true })
  score2_4: string;
  @Column({ nullable: true })
  score2_5: string;

  @Column({ nullable: true, type: 'text' })
  comment: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  created_at: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: string;
}
