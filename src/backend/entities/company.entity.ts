import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_name : string;

    @OneToMany(()=>Users,(users)=>users.userLevelJoin,{ onDelete: "DEFAULT" })
    @JoinColumn()
    usersJoin:Users
}
