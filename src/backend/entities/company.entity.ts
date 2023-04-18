import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { AssessmentDetail } from './assessmentDetail.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_name: string;

    @Column("text")
    company_address: string;

    @Column()
    company_email: string;

    @Column()
    company_tel: string;

    @OneToMany(() => Users, (users) => users.userLevelJoin, { onDelete: "DEFAULT" })
    @JoinColumn()
    usersJoin: Users

    @OneToMany(() => AssessmentDetail, (asDetail) => asDetail.JoinCompany, { onDelete: "DEFAULT" })
    @JoinColumn()
    asJoin: AssessmentDetail
}
