import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { Diary } from './diary.entity';

@Entity()
export class DiaryDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    detail_text:string;

}
