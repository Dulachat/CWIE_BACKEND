/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, UnauthorizedException } from '@nestjs/common';
import { Body, Get, Param, Post, Patch, Delete } from '@nestjs/common/decorators';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { CreateAssessmentDetailDto } from './dto/create-assessmentDetail.dto';
import { UpdateAssessmentDetail } from './dto/update-assessmentDetail.dto';
import { UsersService } from './users.service';

@Controller('assessment')
export class AssessmentController {
    constructor(
        private readonly assessmentService: AssessmentService,
        private readonly userService: UsersService
    ) { }


    @Post('Head')
    create(@Body() createAssessmentDto: CreateAssessmentDto) {
        return this.assessmentService.create(createAssessmentDto)
    }

    @Post('addDetail')
    createDetail(@Body() createAssessmentDetailDto: CreateAssessmentDetailDto) {
        return this.assessmentService.addDetail(createAssessmentDetailDto)
    }

    @Get('getHeader')
    findHeader() {
        return this.assessmentService.findHeader()
    }

    @Get('getOneHead/:status')
    findOneHeader(@Param('status') status: string) {
        return this.assessmentService.findOneHeader(status)
    }

    @Get('getScoreForm08/:id')
    findStudentScore08(@Param('id') id: number) {
        return this.assessmentService.findStudentForm08(id)
    }
    @Get('getScoreForm09/:id')
    findStudentScore09(@Param('id') id: number) {
        return this.assessmentService.findStudentForm09(id)
    }

    @Get('getDetail')
    findDetail() {
        return this.assessmentService.findDetail()
    }
  
    @Get('getOneDetail/:id')
    async findOneDetail(@Param('id') id: any) {
        const studentCompany = await this.assessmentService.findOneDetail(id)
        if (studentCompany != null) {
            const userCompany = await this.userService.findUserCompany(studentCompany.company_id)
            return userCompany
        } else {
            throw new UnauthorizedException();
        }

        //  console.log(userCompany)

    }

    @Patch('updateDetail/:id')
    updateDetail(@Param('id') id: number, @Body() updateAssessmentDetail: UpdateAssessmentDetail) {
        return this.assessmentService.updateDetail(id, updateAssessmentDetail)
    }

    @Delete('deleteDetail/:id')
    removeDetail(@Param('id') id: number) {
        return this.assessmentService.removeDetail(id)
    }





}
