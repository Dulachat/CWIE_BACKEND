import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";

export enum Status{
    on = "0",
    off = "1",
}

@Entity()
export class formQuestion {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    student_id: string
    @Column()
    old_school: string
    @Column()
    province: string
    @Column()
    district: string
    @Column()
    school_type:string
    @Column({type:"varchar",length:20})
    grade:string
    @Column({type:"varchar",length:30})
    parents_occupation:string
    @Column({type:"varchar",length:30})
    earnings:string
    @Column()
    f_academy:number
    @Column()
    f_a1:number
    @Column()
    f_a2:number
    @Column()
    f_a3:number
    @Column()
    f_a4:number
    @Column()
    f_a5:number
    @Column()
    f_finance:number
    @Column()
    f_f1:number
    @Column()
    f_f2:number
    @Column()
    f_f3:number
    @Column()
    f_f4:number
    @Column()
    f_course:number
    @Column()
    f_c1:number
    @Column()
    f_c2:number
    @Column()
    f_c3:number
    @Column()
    f_c4:number
    @Column()
    f_c5:number
    @Column()
    f_family:number
    @Column()
    f_fa1:number
    @Column()
    f_fa2:number
    @Column()
    f_fa3:number
    @Column()
    f_society:number
    @Column()
    f_s1:number
    @Column()
    f_s2:number
    @Column()
    f_s3:number
    @Column()
    f_s4:number
    @Column()
    f_s5:number
    @Column()
    f_public_relation:string
    @Column({type:"enum",enum:[Status.on,Status.off],default:Status.on})
    status:string

    @OneToOne(()=>Student,{cascade:true})
    @JoinColumn({name:'student_id',referencedColumnName:'id'})
    studentId:Student
}
