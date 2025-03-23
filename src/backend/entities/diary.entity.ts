import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { DiaryDetail } from './diaryDetail.entity';
import { Student } from './student.entity';

@Entity()
export class Diary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    diary_date: string;

    @Column({nullable:true})
    time_in: string;

    @Column({nullable:true})
    time_out: string;

    @Column({nullable:true})
    diary_detail_id: string

    @Column()
    student_id: string

    @Column({nullable:true})
    diary_comment: string 

    @Column({nullable:true})
    diary_comment2: string 

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
    view_at: string
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
    created_at: string
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
    updated_at: string

    @OneToOne(()=>DiaryDetail,{cascade:true})
    @JoinColumn({name:"diary_detail_id",referencedColumnName:"id",})
    Detail:DiaryDetail

    @ManyToOne(()=>Student,(student)=>student.Diary,{cascade:true})
    @JoinColumn({name:'student_id',referencedColumnName:"id"})
    StudentDiary:Student
}
