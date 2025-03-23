import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Branch } from './branch.entity';
import { EventTokenEntity } from './EventToken.entity';

@Entity('events')
export class EventsEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  quota: number;
  @Column()
  hour_event: string;
  @Column()
  level_event: string;
  @Column()
  year: string;
  @Column()
  term: string;
  @Column()
  venue: string;
  @Column({ type: 'date' })
  start_date: string;
  @Column({ type: 'date' })
  end_date: string;
  @Column()
  start_time: string;
  @Column()
  end_time: string;
  @Column({ type: 'date' })
  exdDate_token: string;
  @Column()
  exdTime_token: string;

  @Column()
  secret_token: string;

  @Column({ nullable: true })
  branch_id: string;

  @ManyToOne(() => Branch, (branch) => branch.eventJoin,{onDelete:"SET NULL"})
  @JoinColumn({ name: 'branch_id', referencedColumnName: 'id' })
  branchJoinEvent: Branch;

  @OneToMany(() => EventTokenEntity, (token) => token.Event, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  Token: EventTokenEntity;
}
