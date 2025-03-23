import { timeStamp } from 'console';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventsEntity } from './Events.entity';
import { Student } from './student.entity';
import { EventStudent } from './EventStudent.entity';

export enum EToken {
  ON = 'on',
  OFF = 'off',
}

@Entity('event_token')
export class EventTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Token: string;

  
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  created_at: string;
  @Column({ type: 'enum', enum: [EToken.ON, EToken.OFF], default: EToken.ON })
  status: string;
  @Column()
  eventId: string;

  @ManyToOne(() => EventsEntity, (events) => events.Token, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  Event: EventsEntity;

  @OneToOne(() => EventStudent, (student) => student.EventToken) 
  EventStudentList: EventStudent;
}
