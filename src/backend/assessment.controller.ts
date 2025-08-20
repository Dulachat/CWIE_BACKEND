import { Controller, HttpStatus } from '@nestjs/common';
import {
  Body,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  Res,
} from '@nestjs/common/decorators';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { CreateAssessmentDetailDto } from './dto/create-assessmentDetail.dto';
import { UpdateAssessmentDetail } from './dto/update-assessmentDetail.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('assessment')
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,
    private readonly userService: UsersService,
  ) { }

  @Post('Head')
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentService.create(createAssessmentDto);
  }

  @Post('addDetail')
  createDetail(@Body() createAssessmentDetailDto: CreateAssessmentDetailDto) {
    return this.assessmentService.addDetail(createAssessmentDetailDto);
  }

  @Get('getHeader')
  async findHeader(@Query() query) {
    const { status, term } = query;
    const result = await this.assessmentService.findHeader({ status, term });
    return result;
  }

  @Get('getOneHead/:status')
  findOneHeader(@Param('status') status: string) {
    return this.assessmentService.findOneHeader(status);
  }

  @Get('getScoreForm08/:id')
  findStudentScore08(@Param('id') id: number) {
    return this.assessmentService.findStudentForm08(id);
  }
  @Get('getScoreForm09/:id')
  findStudentScore09(@Param('id') id: number) {
    return this.assessmentService.findStudentForm09(id);
  }

  @Get('getDetail')
  async findDetail(@Query() query: any) {
    const { header } = query;
    const result = await this.assessmentService.findDetail(header);
    return result;
  }

  @Get('getOneDetail/:id')
  async findOneDetail(
    @Param('id') id: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const studentCompany = await this.assessmentService.findOneDetail(id);
      if (studentCompany != null) {
        const userCompany = await this.userService.findUserCompany(
          studentCompany.company_id,
        );
        return { evaluator_2: studentCompany.evaluator2_id, data: userCompany };
      }
      res.status(HttpStatus.UNAUTHORIZED);
      return { success: false, message: 'User not found' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Patch('updateDetail/:id')
  updateDetail(
    @Param('id') id: number,
    @Body() updateAssessmentDetail: UpdateAssessmentDetail,
  ) {
    return this.assessmentService.updateDetail(id, updateAssessmentDetail);
  }

  @Delete('deleteDetail/:id')
  removeDetail(@Param('id') id: number) {
    return this.assessmentService.removeDetail(id);
  }

  @Get('detail/:studentId')
  assesDetail(@Param('studentId') id: number) {
    return this.assessmentService.assesDetail(id);
  }

  @Patch('updateHeader/:id')
  updateHeader(
    @Param('id') id: number,
    @Body() updateAssessmentHeader: CreateAssessmentDto,
  ) {
    return this.assessmentService.updateHeaders(id, updateAssessmentHeader);
  }

  @Patch('updateDocument/:studentId')
  updateDocument(
    @Param('studentId') studentId: number,
    @Body() body: any,
  ) {
    return this.assessmentService.updateDocument(studentId, body);
  }


  @Get('getEvaluator')
  getEvaluatorAssessment(@Query() query: any) {
    const { page, limit, yearTerm } = query;
    const res = this.assessmentService.getEvaluator(page, limit, yearTerm);
    return res
  }
}
