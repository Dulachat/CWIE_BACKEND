import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { PinoLogger } from 'util/logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentModule } from './backend/assessment.module';
import { AuthModule } from './backend/auth.module';
import { BranchModule } from './backend/branch.module';
import { CompanyModule } from './backend/company.module';
import { DiaryModule } from './backend/diary.module';
import IndexEntity from './backend/entities';
import { EventsModule } from './backend/EventsStudent/Events.module';
import { RandomStringService } from './backend/EventsStudent/randomstring.service';
import { ScoreModule } from './backend/score.module';
import { StudentModule } from './backend/student.module';
import { UsersModule } from './backend/users.module';
import { UserslevelModule } from './backend/userslevel.module';
import { ProfileModule } from './profile/profile.module';

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
        ...IndexEntity
      ],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    }),
  ],
  controllers: [AppController],
  providers: [PinoLogger, RandomStringService, AppService],
})
export class AppModule { }
