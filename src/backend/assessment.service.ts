import { status } from './entities/assessmentHeader.entity';
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
import { UserAssessment } from './entities/UserAssessment.entity';
import { RandomStringService } from './EventsStudent/randomstring.service';
import { Company } from './entities/company.entity';
import * as bcrypt from 'bcrypt';

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
    @InjectRepository(UserAssessment)
    private userAssessmentRepository: Repository<UserAssessment>,
    private randomStringService: RandomStringService,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) { }

  async findHeader(body) {
    const where = {};
    if (body.status) {
      Object.assign(where, { status: body.status });
    }
    if (body.term) {
      Object.assign(where, { yearTerm: body.term });
    }
    const data = await this.assessmentRepository.find({
      order: { created_at: 'DESC' },
      where: where,
    });
    return data;
  }
  async findOneHeader(status: string) {
    return await this.assessmentRepository.find({
      where: { status: status },
    });
  }
  async findOneDetail(id: any) {
    return await this.assessmentDetailRepository.findOne({
      where: { student_id: id },
    });
  }
  async findDetail(header_id: number) {
    const data = await this.assessmentDetailRepository.find({
      relations: {
        JoinStudent: true,
        JoinCompany: true,
        JoinEvaluator1: true,
        JoinEvaluator2: true,
      },
      where: {
        header_id: header_id,
      },
      order: {
        id: 'desc',
      },
    });
    // Fetch all student data in parallel
    const studentPromises = data.map(async (item) => {
      const stuData = await this.studentRepository.findOne({
        where: { id: item.student_id },
        relations: ['branchJoin', 'address'],
      });
      item.JoinStudent = stuData;
    });
    // Fetch evaluator data in parallel using Promise.all
    const evaluatorPromises = data.map(async (item) => {
      if (item.JoinEvaluator1 != null) {
        const userData = await this.usersRepository.findOne({
          where: { id: item.evaluator1_id },
          relations: ['branchJoinUser'],
        });
        item.JoinEvaluator1 = userData;
      } else {
        const userAssessmentData = await this.userAssessmentRepository.findOne({
          where: { id: item.evaluator2_id },
          relations: ['companyJoin'],
        });
        item.JoinEvaluator2 = userAssessmentData;
      }
    });
    // Wait for all promises to resolve
    await Promise.all([...studentPromises, ...evaluatorPromises]);
    return data;
  }

  async findStudentForm08(id: number) {
    const head = await this.assessmentRepository.find({
      where: { status: '1' },
    });
    const data = [];
    for (const item of head) {
      const itemData = await this.assessmentDetailRepository.find({
        where: { header_id: item.id, evaluator1_id: id },
        relations: [
          'JoinForm09',
          'JoinForm08',
          'JoinEvaluator1',
          'JoinStudent',
        ],
      });
      if (itemData && itemData.length > 0) {
        data.push(itemData);
      }
    }
    return data[0];
  }
  async findStudentForm09(id: number) {
    const head = await this.assessmentRepository.find({
      where: { status: '1' },
    });
    const data = [];
    for (const item of head) {
      const itemData = await this.assessmentDetailRepository.find({
        where: { header_id: item.id, evaluator2_id: id },
        relations: [
          'JoinForm09',
          'JoinForm08',
          'JoinEvaluator2',
          'JoinStudent',
        ],
      });
      if (itemData && itemData.length > 0) {
        data.push(itemData);
      }
    }
    return data[0];
  }

  //add or create

  async create(createAssessmentDto: CreateAssessmentDto) {
    const check = await this.assessmentRepository.findOne({
      where: {
        assessment_name: createAssessmentDto.assessment_name,
      },
    });
    if (check != null) {
      return 'error';
    }
    if (check === null) {
      await this.assessmentRepository.save(createAssessmentDto);
      return 'success';
    }
  }

  async addDetail(createAssessmentDetailDto: CreateAssessmentDetailDto) {
    try {
      const check = await this.assessmentDetailRepository.findOne({
        where: { student_id: createAssessmentDetailDto.student_id },
      });
      if (check != null) {
        return { message: "already have", data: check };
      }
      if (check == null) {
        const findStudent = await this.studentRepository.findOne({
          where: { id: parseInt(createAssessmentDetailDto.student_id) },
        });

        findStudent.waitings_status = '1';
        await this.studentRepository.update(
          createAssessmentDetailDto.student_id,
          findStudent,
        );

        const form08 = new FormInTP08();
        await this.form08Repository.save(form08);
        const form09 = new FormInTP09();
        await this.form9Repository.save(form09);


        const findCompany = await this.companyRepository.findOne({
          where: { id: createAssessmentDetailDto.company_id },
        });
        const password = this.randomStringService.generatePassword(8);
        const userAssessment = new UserAssessment();
        userAssessment.username = this.randomStringService.generateUsername(10);
        userAssessment.pwd = await bcrypt.hash(password, 10);
        userAssessment.rawPwd = password;
        userAssessment.fname_TH = findCompany.company_name;
        userAssessment.lname_TH = "-";
        userAssessment.company_id = findCompany.id;
        userAssessment.user_level_id = 3;
        await this.userAssessmentRepository.save(userAssessment);

        const asDetail = new AssessmentDetail();
        asDetail.header_id = createAssessmentDetailDto.header_id;
        asDetail.evaluator1_id = createAssessmentDetailDto.evaluator1_id;
        asDetail.evaluator2_id = userAssessment.id;
        asDetail.student_id = createAssessmentDetailDto.student_id;
        asDetail.company_id = createAssessmentDetailDto.company_id;
        asDetail.JoinForm08 = form08;
        asDetail.JoinForm09 = form09;
        await this.assessmentDetailRepository.save(asDetail);




        return 'success';
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateDocument(student_id: number, body: any) {

    const asDetail = await this.assessmentDetailRepository.findOne({
      where: { student_id: student_id },
    });
    asDetail.documentLink = body.documentLink;
    await this.assessmentDetailRepository.update(asDetail.id, asDetail);
    return {
      message: 'success',
      data: asDetail,
    };
  }
  //Update

  updateDetail(id: number, updateAssessmentDetail: UpdateAssessmentDetail) {
    return this.assessmentDetailRepository.update(id, updateAssessmentDetail);
  }
  async updateHeaders(id: number, updateAssessmentHeader: any) {
    try {
      await this.assessmentRepository.update(id, updateAssessmentHeader);
      return {
        status: 200,
        message: 'success',
      };
    } catch (error) {
      throw error;
    }

    return;
  }
  //Delete
  async removeDetail(id: number) {
    const remove = await this.assessmentDetailRepository.findOne({
      where: { id: id },
    });
    const setStudent = await this.studentRepository.findOne({
      where: { id: remove.student_id },
    });
    setStudent.waitings_status = '0';
    this.studentRepository.update(setStudent.id, setStudent);
    return this.assessmentDetailRepository.remove(remove);
  }

  async assesDetail(id: number) {
    const result = await this.assessmentDetailRepository.findOne({
      where: { student_id: id },
      relations: ['JoinCompany'],
    });

    return result
  }

  async getEvaluator(page: number = 1, limit: number = 10, year?: string) {

    const query = this.userAssessmentRepository.createQueryBuilder('userAssessment')
      .leftJoinAndSelect('userAssessment.companyJoin', 'company')
      .leftJoinAndSelect('userAssessment.userLevelJoin', 'userLevel')
      .leftJoinAndSelect('userLevel.userAssessmentJoin', 'userAssessmentJoin')
      // .leftJoinAndSelect('userAssessmentJoin.header_id', 'header')
      .orderBy('userAssessment.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    console.log(year, year)

    if (year) {
      query.where('userAssessment.created_at LIKE :year', { year: `%${year}%` })
    }

    const userAssessment = await query.getMany();

    const assessmentDetail = await this.assessmentDetailRepository.find({
      relations: ['JoinStudent', 'JoinEvaluator1', 'JoinEvaluator2'],
    });

    const students = await this.studentRepository.find({});

    const merged = await Promise.all(
      userAssessment.map(async (item) => {
        const detail = assessmentDetail.find((d) => d.evaluator2_id === item.id);
        const studentData = detail ? students.find((stu) => stu.id === detail.student_id) : undefined;
        return { ...item, student: studentData };
      })
    );

    return { success: true, data: merged }
  }
}
