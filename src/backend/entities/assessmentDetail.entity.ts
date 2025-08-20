import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { Student } from './student.entity';
import { Users } from './users.entity';
import { Company } from './company.entity';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';
import { Branch } from './branch.entity';
import { FormInTP08 } from './formintp08.entity';
import { FormInTP09 } from './formintp09.entity';
import { UserAssessment } from './UserAssessment.entity';

@Entity()
export class AssessmentDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    header_id: number;

    @Column()
    student_id: number;

    @Column()
    evaluator1_id: number;

    @Column({ nullable: true })
    evaluator2_id: number;

    @Column()
    company_id: number


    @Column({ nullable: true })
    form08Id: string

    @Column({ nullable: true })
    form09Id: string

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created_at: string

    @Column({ type: 'text', nullable: true })
    documentLink: string


    @OneToOne(() => FormInTP08)
    @JoinColumn({ name: "form08Id", referencedColumnName: "id" })
    JoinForm08: FormInTP08;

    @ManyToOne(() => FormInTP09)
    @JoinColumn({ name: "form09Id", referencedColumnName: "id" })
    JoinForm09: FormInTP09;

    @OneToOne(() => Student, { cascade: true })
    @JoinColumn({ name: 'student_id', referencedColumnName: "id" })
    JoinStudent: Student


    @ManyToOne(() => Users, (user) => user.JoinAssessmentDetail, { cascade: true })
    @JoinColumn({ name: 'evaluator1_id', referencedColumnName: 'id' })
    JoinEvaluator1: Users

    @ManyToOne(() => UserAssessment, (user) => user.JoinAssessmentDetail, { cascade: true, onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'evaluator2_id', referencedColumnName: 'id' })
    JoinEvaluator2: UserAssessment

    @ManyToOne(() => Company, (company) => company.asJoin, { cascade: true })
    @JoinColumn({ name: 'company_id', referencedColumnName: "id" })
    JoinCompany: Company
}
