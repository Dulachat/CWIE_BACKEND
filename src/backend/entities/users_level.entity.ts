import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { UserAssessment } from './UserAssessment.entity';

@Entity()
export class userLevel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level_name: string;

    @OneToMany(() => Users, (users) => users.userLevelJoin, { onDelete: "DEFAULT" })
    @JoinColumn()
    usersJoin: Users

    @OneToMany(() => UserAssessment, (userAssessment) => userAssessment.userLevelJoin, { onDelete: "DEFAULT" })
    @JoinColumn()
    userAssessmentJoin: UserAssessment[]
}
