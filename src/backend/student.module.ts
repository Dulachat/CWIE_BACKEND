import { StudentService } from './student.service';
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { studentAddress } from './entities/studentaddress.entity';
import { AssessmentDetail } from './entities/assessmentDetail.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Student, studentAddress, AssessmentDetail])],
    controllers: [StudentController],
    providers: [
        StudentService],
    exports: [StudentService],
})
export class StudentModule { }
