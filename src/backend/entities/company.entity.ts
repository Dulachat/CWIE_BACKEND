import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { AssessmentDetail } from './assessmentDetail.entity';
import { UserAssessment } from './UserAssessment.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

  @Column({ nullable: true, type: 'text' })
  company_address: string;

  @Column({ nullable: true })
  company_email: string;

  @Column({ nullable: true })
  company_tel: string;

  @Column({ type: 'text', nullable: true })
  maps_img: string;

  @Column({ type: 'text', nullable: true })
  maps_url: string;

  @Column({ type: 'text', nullable: true })
  maps_detail: string;

  @OneToMany(() => Users, (users) => users.userLevelJoin, {
    onDelete: 'DEFAULT',
    nullable: true,
  })
  @JoinColumn()
  usersJoin: Users;

  @OneToMany(() => AssessmentDetail, (asDetail) => asDetail.JoinCompany, {
    onDelete: 'DEFAULT',
    nullable: true,
  })
  @JoinColumn()
  asJoin: AssessmentDetail;

  @OneToMany(() => UserAssessment, (userAssessment) => userAssessment.companyJoin, {
    onDelete: 'DEFAULT',
    nullable: true,
  })
  @JoinColumn()
  usersAssessmentJoin: UserAssessment;
}
