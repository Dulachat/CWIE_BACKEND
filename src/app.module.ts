import { DiaryModule } from './backend/diary.module';
import { DiaryController } from './backend/diary.controller';
import { AssessmentModule } from './backend/assessment.module';
import { AssessmentController } from './backend/assessment.controller';
import { ScoreModule } from './backend/score.module';
import { ScoreController } from './backend/score.controller';
import { AuthModule } from './backend/auth.module';
import { UserslevelModule } from './backend/userslevel.module';
import { UsersModule } from './backend/users.module';
import { CompanyModule } from './backend/company.module';
import { BranchModule } from './backend/branch.module';
import { StudentModule } from './backend/student.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './backend/entities/student.entity';
import 'dotenv/config'
import { studentAddress } from './backend/entities/studentaddress.entity';
import { Branch } from './backend/entities/branch.entity';
import { Company } from './backend/entities/company.entity';
import { Diary } from './backend/entities/diary.entity';
import { Users } from './backend/entities/users.entity';
import { userLevel } from './backend/entities/users_level.entity';
import { FormInTP08 } from './backend/entities/formintp08.entity';
import { FormInTP09 } from './backend/entities/formintp09.entity';
import { AssessmentHeader } from './backend/entities/assessmentHeader.entity';
import { AssessmentDetail } from './backend/entities/assessmentDetail.entity';
import { DiaryDetail } from './backend/entities/diaryDetail.entity';


@Module({
  imports: [
    DiaryModule,
    AssessmentModule,
    ScoreModule,
    AuthModule,
    UserslevelModule,
    UsersModule,
    CompanyModule,
    BranchModule,
    StudentModule, TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Student, studentAddress, Branch, Company, Diary,DiaryDetail, Users, userLevel, FormInTP08, FormInTP09, AssessmentHeader, AssessmentDetail],
      synchronize: true,
    })],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }
