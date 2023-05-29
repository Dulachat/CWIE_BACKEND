import { Body, Controller, Get, Post } from '@nestjs/common';
import { FormQuestionService } from './formQuestion.service';
import { CreateQuestionDto } from '../dto/create-formQusetion.dto'

@Controller('formQuestion')
export class FormQuestionController {
  constructor(private formQuestionService: FormQuestionService) { }

  @Post('create')
  async createFormQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      const Question = await this.formQuestionService.createFormQuestion(createQuestionDto)
      return Question
    } catch (error) {
      throw error
    }


  }

  @Get()
  async findScoreQuestion() {
    try {
      const allQuestion = await this.formQuestionService.findAll()
      return allQuestion
    } catch (error) {
      throw error
    }
  }

}
