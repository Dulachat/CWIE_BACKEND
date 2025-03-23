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
export class FormInTP09 {
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
  score1_6: string;
  @Column({ nullable: true })
  score1_7: string;
  @Column({ nullable: true })
  score2_1: string;
  @Column({ nullable: true })
  score2_2: string;
  @Column({ nullable: true })
  score2_3: string;
  @Column({ nullable: true })
  score3_1: string;
  @Column({ nullable: true })
  score3_2: string;
  @Column({ nullable: true })
  score3_3: string;
  @Column({ nullable: true })
  score3_4: string;
  @Column({ nullable: true })
  score3_5: string;
  @Column({ nullable: true })
  score4_1: string;
  @Column({ nullable: true })
  score4_2: string;
  @Column({ nullable: true })
  score4_3: string;
  @Column({ nullable: true })
  score4_4: string;
  @Column({ nullable: true })
  score4_5: string;

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
