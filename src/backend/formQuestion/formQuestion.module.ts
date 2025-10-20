import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormQuestionController } from './formQuestion.controller';
import { FormQuestionService } from './formQuestion.service';
import { formQuestion } from '../entities/formQuestionnaire';
import { Student } from '../entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([formQuestion, Student])],
  providers: [FormQuestionService],
  controllers: [FormQuestionController]
})
export class FormQuestionModule { }
