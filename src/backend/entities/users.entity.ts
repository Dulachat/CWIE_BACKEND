import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Branch } from './branch.entity';
import { Company } from './company.entity';
import { userLevel } from './users_level.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    pwd: string;

    @Column()
    fname_TH:string;

    @Column()
    lname_TH:string;

    @Column({ nullable: true })
    fname_EN:string;

    @Column({ nullable: true })
    lname_EN:string;

    @Column({ nullable: true })
    email:string;

    @Column({ nullable: true })
    tel:string;

    @Column({ nullable: true })
    branch_id: string

    @Column({ nullable: true })
    company_id: string

    @Column()
    user_level_id: string


    @ManyToOne(() => Branch, (branch) => branch.usersJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
    branchJoinUser: Branch[];

    @ManyToOne(() => userLevel, (userlevel) => userlevel.usersJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_level_id", referencedColumnName: "id" })
    userLevelJoin: userLevel[];

    @ManyToOne(() => Company, (company) => company.usersJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "company_id", referencedColumnName: "id" })
    companyJoin: Company[];
}
