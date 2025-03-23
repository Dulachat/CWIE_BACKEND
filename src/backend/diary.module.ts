import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryService } from './diary.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { Diary } from './entities/diary.entity';
import { DiaryDetail } from './entities/diaryDetail.entity';
import { studentAddress } from './entities/studentaddress.entity';
import { Student } from './entities/student.entity';
import { Users } from './entities/users.entity';
import { AssessmentHeader } from './entities/assessmentHeader.entity';
import { AssessmentDetail } from './entities/assessmentDetail.entity';
import { PinoLogger } from 'util/logger';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Diary,
      DiaryDetail,
      studentAddress,
      Student,
      AssessmentHeader,
      AssessmentDetail,
      Users,
    ]),
  ],
  controllers: [DiaryController],
  providers: [PinoLogger, DiaryService],
})
export class DiaryModule {}
