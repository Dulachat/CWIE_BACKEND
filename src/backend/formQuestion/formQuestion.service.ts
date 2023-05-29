import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formQuestion } from '../entities/formQuestionnaire';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-formQusetion.dto';

@Injectable()
export class FormQuestionService {

    constructor(
        @InjectRepository(formQuestion)
        private readonly formQuestion: Repository<formQuestion>
    ) { }

    createFormQuestion(createQuestionDto: CreateQuestionDto) {
        return this.formQuestion.save(createQuestionDto)
    }

    findAll() {
        return this.formQuestion.find({
            relations:['studentId']
        });
    }


}
