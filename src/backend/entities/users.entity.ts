import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, Generated, ManyToMany } from 'typeorm';
import { Branch } from './branch.entity';
import { Company } from './company.entity';
import { userLevel } from './users_level.entity';
import { AssessmentDetail } from './assessmentDetail.entity';

export enum UserStatus {
    OFF = "0",
    ON = "1",
}
@Entity()
export class Users {
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

    @Column({ nullable: true })
    fname_EN: string;

    @Column({ nullable: true })
    lname_EN: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    tel: string;

    @Column({ nullable: true })
    branch_id: string

    @Column({ nullable: true })
    company_id: string

    @Column()
    user_level_id: string

    @Column({nullable:true})
    profile_image: string

    @Column()
    @Generated('uuid')
    uuid: string

    @Column({ type: "enum", enum: [UserStatus.ON, UserStatus.OFF], default: UserStatus.ON, nullable: true })
    status: string

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
    created_at: string
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
    updated_at: string

    @ManyToOne(() => Branch, (branch) => branch.usersJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
    branchJoinUser: Branch[];

    @ManyToOne(() => userLevel, (userlevel) => userlevel.usersJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_level_id", referencedColumnName: "id" })
    userLevelJoin: userLevel[];

    @ManyToOne(() => Company, (company) => company.usersJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "company_id", referencedColumnName: "id" })
    companyJoin: Company[];

    @OneToMany(() => AssessmentDetail, (asDetail) => asDetail.JoinEvaluator1, { onDelete: "CASCADE" })
    @JoinColumn()
    JoinAssessmentDetail: AssessmentDetail[]

    @OneToMany(() => AssessmentDetail, (asDetail) => asDetail.JoinEvaluator1, { onDelete: "CASCADE" })
    @JoinColumn()
    JoinAssessmentDetail2: AssessmentDetail[]
}
