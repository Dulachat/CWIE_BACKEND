import { StudentService } from './student.service';
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { studentAddress } from './entities/studentaddress.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Student, studentAddress])],
    controllers: [StudentController],
    providers: [
        StudentService],
})
export class StudentModule { }
