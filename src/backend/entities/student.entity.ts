
import { Hash } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert, OneToMany, ManyToOne, Generated } from 'typeorm';
import { Branch } from './branch.entity';
import { studentAddress } from './studentaddress.entity';
import { AssessmentDetail } from './assessmentDetail.entity';
import { Diary } from './diary.entity';

export enum InternStatus {
    CooperativeEducation = "0",
    PracticeExperience = "1",
    NotSelected = "2" 
}

export enum UserStatus {
    OFF = "0",
    ON = "1",
}

export enum waitingsStatus {
    WAIT = "0",
    INTERN = "1",
    FINISH = "2",
}
@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    pwd: string;
    @Column()
    title_name: string;
    @Column()
    fname_TH: string;
    @Column()
    lname_TH: string;
    @Column({ nullable: true })
    fname_EN: string;
    @Column({ nullable: true })
    lname_EN: string;
    @Column()
    student_id: string;
    @Column()
    student_group: string;
    @Column()
    tel: string;
    @Column()
    email: string;
    @Column({ nullable: true })
    facebook: string;
    @Column({ nullable: true })
    emergency_person_fname: string;
    @Column({ nullable: true })
    emergency_person_lname: string;
    @Column({ nullable: true })
    emergency_tel: string;
    @Column({ nullable: true })
    id_card: string;
    @Column({ nullable: true })
    issue_at: string;
    @Column({type:'date', nullable: true })
    issue_date: Date;
    @Column({type:'date', nullable: true })
    expiry_date: Date;
    @Column({ nullable: true })
    race: string;
    @Column({ nullable: true })
    nationality: string;
    @Column({ nullable: true })
    religion: string;
    @Column({type:'date', nullable: true })
    dateofbirth: Date;
    @Column({ nullable: true })
    age: number;
    @Column({ nullable: true })
    sex: string;
    @Column({ nullable: true })
    p_height: number
    @Column({ nullable: true })
    p_weight: number
    @Column({ nullable: true })
    address_id: number;
    @Column()
    branch_id: string;
    @Column({ type: "enum", enum: [InternStatus.CooperativeEducation, InternStatus.PracticeExperience,InternStatus.NotSelected], nullable: true })  // internStatus
    intern_status: string;

    @Column({ type: "enum", enum: [waitingsStatus.WAIT, waitingsStatus.INTERN, waitingsStatus.FINISH], default: waitingsStatus.WAIT, nullable: true })  //waiting intern
    waitings_status: string

    @Column({ type: "enum", enum: [UserStatus.ON, UserStatus.OFF], default: UserStatus.ON, nullable: true })  //
    status: string

    @Column({nullable:true})
    profile_image: string

    @Column()
    @Generated('uuid')
    uuid: string
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
    created_at: string
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
    updated_at: string

    @OneToOne(() => studentAddress, { cascade: true })
    @JoinColumn({ name: "address_id", referencedColumnName: "id" })
    address: studentAddress

    @ManyToOne(() => Branch, (branch) => branch.studentJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
    branchJoin: Branch;
    
    @OneToMany(()=>Diary,(diary)=>diary.StudentDiary,{onDelete:"SET NULL"})
    @JoinColumn()
    Diary: Diary[];
}


