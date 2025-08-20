import {
    Column, PrimaryGeneratedColumn,
    Entity, JoinColumn, OneToMany,
    ManyToOne,
    Generated
} from "typeorm";
import { AssessmentDetail } from "./assessmentDetail.entity";
import { userLevel } from "./users_level.entity";
import { Company } from "./company.entity";

export enum UserStatus {
    OFF = "0",
    ON = "1",
}

@Entity()
export class UserAssessment {
    @PrimaryGeneratedColumn()
    id: number;

    @Generated("uuid")
    @Column()
    uuid: string;

    @Column()
    username: string;

    @Column()
    pwd: string;

    @Column()
    rawPwd: string

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
    company_id: number

    @Column()
    user_level_id: number

    @Column({ type: "enum", enum: [UserStatus.ON, UserStatus.OFF], default: UserStatus.ON, nullable: true })
    status: string

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
    created_at: string
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: true })
    updated_at: string

    @OneToMany(() => AssessmentDetail, (asDetail) => asDetail.JoinEvaluator2, { onDelete: "CASCADE" })
    @JoinColumn()
    JoinAssessmentDetail: AssessmentDetail[]

    @ManyToOne(() => userLevel, (userlevel) => userlevel.userAssessmentJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_level_id", referencedColumnName: "id" })
    userLevelJoin: userLevel


    @ManyToOne(() => Company, (company) => company.usersAssessmentJoin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "company_id", referencedColumnName: "id" })
    companyJoin: Company;
}