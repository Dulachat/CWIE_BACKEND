import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum status {
    ON = "1",
    OFF = "0"
}

@Entity()
export class AssessmentHeader {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    assessment_name: string;
    @Column()
    yearTerm: string;
    @Column({ type: "enum", enum: [status.OFF, status.ON], default: status.OFF })
    status: string;
    @Column({ type: "date" })
    start_at: string;
    @Column({ type: "date" })
    end_at: string;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true })
    created_at: string;
}
