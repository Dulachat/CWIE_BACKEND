import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventsEntity } from './Events.entity';
import { EventTokenEntity } from './EventToken.entity';
import { Student } from './student.entity';

export enum EStatus {
  ON = 'ON',
  OFF = 'OFF',
}

@Entity('event_student')
export class EventStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: [EStatus.OFF, EStatus.ON],
    default: EStatus.ON,
  })
  status: string;

  @Column({ nullable: true })
  studentId: number;

  @Column()
  tokenId: number;

  @Column()
  eventId: string;

  @OneToOne(() => EventTokenEntity, (event) => event.EventStudentList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tokenId', referencedColumnName: 'id' })
  EventToken: EventTokenEntity;

  @ManyToOne(() => Student, (student) => student.event, { cascade: true })
  @JoinColumn({ name: 'studentId', referencedColumnName: 'id' })
  student: Student[];
}
