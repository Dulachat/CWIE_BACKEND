import { AssessmentService } from './assessment.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentController } from './assessment.controller';
import { AssessmentHeader } from './entities/assessmentHeader.entity';
import { AssessmentDetail } from './entities/assessmentDetail.entity';
import { Student } from './entities/student.entity';
import { Users } from './entities/users.entity';
import { FormInTP08 } from './entities/formintp08.entity';
import { FormInTP09 } from './entities/formintp09.entity';
import { UsersService } from './users.service';
import { FormQuestionModule } from './formQuestion/formQuestion.module';
import { UserAssessment } from './entities/UserAssessment.entity';
import { RandomStringService } from './EventsStudent/randomstring.service';
import { Company } from './entities/company.entity';


@Module({
    imports: [
        FormQuestionModule,
        TypeOrmModule.forFeature([AssessmentHeader, Company, UserAssessment, AssessmentDetail, Student, Users, FormInTP08, FormInTP09])],
    controllers: [AssessmentController],
    providers: [UsersService,
        AssessmentService,
        RandomStringService]
})
export class AssessmentModule { }
