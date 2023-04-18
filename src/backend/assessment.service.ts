/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AssessmentHeader } from './entities/assessmentHeader.entity';
import { AssessmentDetail } from './entities/assessmentDetail.entity';
import { CreateAssessmentDetailDto } from './dto/create-assessmentDetail.dto';
import { Student } from './entities/student.entity';
import { Users } from './entities/users.entity';
import { UpdateAssessmentDetail } from './dto/update-assessmentDetail.dto';
import { FormInTP08 } from './entities/formintp08.entity';
import { FormInTP09 } from './entities/formintp09.entity';

@Injectable()
export class AssessmentService {
    constructor(
        @InjectRepository(AssessmentHeader)
        private readonly assessmentRepository: Repository<AssessmentHeader>,
        @InjectRepository(AssessmentDetail)
        private readonly assessmentDetailRepository: Repository<AssessmentDetail>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(FormInTP08)
        private form08Repository: Repository<FormInTP08>,
        @InjectRepository(FormInTP09)
        private form9Repository: Repository<FormInTP09>,
    ) { }

    //find

    findHeader() {
        return this.assessmentRepository.find()
    }
    findOneHeader(status: string) {
        return this.assessmentRepository.findOne({
            where: { status: status }
        })
    }
    findOneDetail(id: any) {
        return this.assessmentDetailRepository.findOne({
            where: { student_id: id }
        })

    }
    async findDetail() {
        const data = await this.assessmentDetailRepository.find({
            relations: { JoinStudent: true, JoinCompany: true, JoinEvaluator1: true, JoinEvaluator2: true },
        })

        for (let i in data) {
            let stuData = await this.studentRepository.findOne({
                where: { id: data[i].student_id },
                relations: ["branchJoin", "address"]

            })
            data[i].JoinStudent = stuData
        }

        for (let i in data) {
            if (data[i].JoinEvaluator1 != null) {
                let userData = await this.usersRepository.findOne({
                    where: { id: data[i].evaluator1_id },
                    relations: ["branchJoinUser"]
                })
                data[i].JoinEvaluator1 = userData
            } else {
                let userData = await this.usersRepository.findOne({
                    where: { id: data[i].evaluator2_id },
                    relations: ["companyJoin"]
                })
                data[i].JoinEvaluator2 = userData
            }

        }
        return data
    }

 

    async findStudentForm08(id: number) {
        const head = await this.assessmentRepository.findOne({
            where: { status: '1' }
        })

        return await this.assessmentDetailRepository.find({
            where: { header_id: head.id, evaluator1_id: id },
            relations: ["JoinForm08", "JoinForm09", "JoinEvaluator1", "JoinStudent"]
        })
    }
    async findStudentForm09(id: number) {
        const head = await this.assessmentRepository.findOne({
            where: { status: '1' }
        })
        return await this.assessmentDetailRepository.find({
            where: { header_id: head.id, evaluator2_id: id },
            relations: ["JoinForm09", "JoinForm08", "JoinEvaluator2", "JoinStudent"]
        })
        //   console.log(detail)
    }

    //add or create

    async create(createAssessmentDto: CreateAssessmentDto) {
        console.log(createAssessmentDto)
        const check = await this.assessmentRepository.findOne({
            where: {
                assessment_name: createAssessmentDto.assessment_name
            }
        })
        if (check != null) {
            return "error"
        } if (check === null) {

            await this.assessmentRepository.save(createAssessmentDto)
            return "success"
        }
    }

    async addDetail(createAssessmentDetailDto: CreateAssessmentDetailDto) {
        const check = await this.assessmentDetailRepository.findOne({
            where: { student_id: createAssessmentDetailDto.student_id }
        })
        if (check != null) {
            return "error"
        } if (check == null) {
            const findStudent = await this.studentRepository.findOne({ where: { id: parseInt(createAssessmentDetailDto.student_id) } })
            findStudent.waitings_status = "1"
            await this.studentRepository.update(createAssessmentDetailDto.student_id, findStudent)

            const form08 = new FormInTP08()
            await this.form08Repository.manager.save(form08)
            const form09 = new FormInTP09()
            await this.form9Repository.manager.save(form09)

            const asDetail = new AssessmentDetail()
            asDetail.header_id = createAssessmentDetailDto.header_id
            asDetail.evaluator1_id = createAssessmentDetailDto.evaluator1_id
            asDetail.student_id = createAssessmentDetailDto.student_id
            asDetail.company_id = createAssessmentDetailDto.company_id
            asDetail.JoinForm08 = form08
            asDetail.JoinForm09 = form09
            await this.assessmentDetailRepository.manager.save(asDetail)
            return "success"
        }

    }


    //Update

    updateDetail(id: number, updateAssessmentDetail: UpdateAssessmentDetail) {

        return this.assessmentDetailRepository.update(id, updateAssessmentDetail)

    }
    //Delete
    async removeDetail(id: number) {
        const remove = await this.assessmentDetailRepository.findOne({
            where: { id: id }
        })
        const setStudent = await this.studentRepository.findOne({
            where: { id: remove.student_id }
        })
        setStudent.waitings_status = "0"
        this.studentRepository.update(setStudent.id, setStudent)
        return this.assessmentDetailRepository.remove(remove)

    }




}
