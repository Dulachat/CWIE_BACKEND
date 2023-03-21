import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Student } from './student.entity';
import { Users } from './users.entity';

@Entity()
export class Branch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    branch_name: string;

    @OneToMany(()=>Student,(student)=>student.branchJoin,{ onDelete: "DEFAULT" })
    @JoinColumn()
    studentJoin:Student

    @OneToMany(()=>Users,(users)=>users.branchJoinUser,{ onDelete: "DEFAULT" })
    @JoinColumn()
    usersJoin:Users
}
