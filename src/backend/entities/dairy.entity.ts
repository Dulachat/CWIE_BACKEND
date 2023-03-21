import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dairy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
   d_date : string;

   @Column()
   d_time_start:Date;

   @Column()
   d_time_end:Date; 
   
   @Column("text")
   dairy_detail_id:string

}
