
import { Hash } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import { Branch } from './branch.entity';
import { studentAddress } from './studentaddress.entity';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;

    @Column()
    pwd: string;
    @Column()
    fname_TH: string;
    @Column()
    lname_TH: string;
    @Column()
    fname_EN: string;
    @Column()
    lname_EN: string;
    @Column()
    student_id: string;
    @Column()
    student_group: string;
  
    @Column()
    tel: string;
    @Column()
    email: string;
    @Column()
    facebook: string;
    @Column()
    emergency_person_fname: string;
    @Column()
    emergency_person_lname: string;
    @Column()
    emergency_tel: string;
    @Column()
    id_card: string;
    @Column()
    issue_at: string;
    @Column('date')
    issue_date: Date;
    @Column('date')
    expiry_date: Date;
    @Column()
    race: string;
    @Column()
    nationality: string;
    @Column()
    religion: string;
    @Column('date')
    dateofbirth: Date;
    @Column()
    age: number;
    @Column()
    sex: string;
    @Column()
    p_height: number
    @Column()
    p_weight: number
    @Column()
    address_id: number;
    @Column()
    branch_id: string;

    @OneToOne(() => studentAddress, { cascade: true })
    @JoinColumn({ name: "address_id", referencedColumnName: "id" })
    address: studentAddress

    @ManyToOne(() => Branch, (branch) => branch.studentJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
    branchJoin: Branch[];

}


