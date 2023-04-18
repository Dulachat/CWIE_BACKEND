import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class studentAddress {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    address_no: string;
    @Column({ nullable: true })
    moo: string;
    @Column({ nullable: true })
    road: string;
    @Column({ nullable: true })
    sub_district: string;
    @Column({ nullable: true })
    district: string;
    @Column({ nullable: true })
    province: string;
    @Column({ nullable: true })
    postal_code: string;



}
