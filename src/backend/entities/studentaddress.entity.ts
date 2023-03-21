import { Entity, PrimaryGeneratedColumn, Column,OneToOne } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class studentAddress {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    address_no : string;
    @Column()
    moo:string;
    @Column()
    road:string;
    @Column()
    sub_district:string;
    @Column()
    district:string;
    @Column()
    province:string;
    @Column()
    postal_code:string;
    

    

}
