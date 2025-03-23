import { ProfileModule } from './profile/profile.module';
import { RandomStringService } from './backend/EventsStudent/randomstring.service';
import { DiaryModule } from './backend/diary.module';
import { AssessmentModule } from './backend/assessment.module';
import { ScoreModule } from './backend/score.module';
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
import 'dotenv/config';
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
import { formQuestion } from './backend/entities/formQuestionnaire';
import { EventsEntity } from './backend/entities/Events.entity';
import { EventStudent } from './backend/entities/EventStudent.entity';
import { EventsModule } from './backend/EventsStudent/Events.module';
import { EventTokenEntity } from './backend/entities/EventToken.entity';
import { ProfileService } from './profile/profile.service';
import { PinoLogger } from 'util/logger';

@Module({
  imports: [
    ProfileModule,
    DiaryModule,
    AssessmentModule,
    ScoreModule,
    AuthModule,
    UserslevelModule,
    UsersModule,
    CompanyModule,
    BranchModule,
    EventsModule,
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [
        EventTokenEntity,
        EventStudent,
        EventsEntity,
        formQuestion,
        Student,
        studentAddress,
        Branch,
        Company,
        Diary,
        DiaryDetail,
        Users,
        userLevel,
        FormInTP08,
        FormInTP09,
        AssessmentHeader,
        AssessmentDetail,
      ],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    }),
  ],
  controllers: [AppController],
  providers: [PinoLogger, RandomStringService, AppService],
})
export class AppModule {}
