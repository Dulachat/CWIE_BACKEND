import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { DiaryDetail } from './entities/diaryDetail.entity';
import { CreateDiaryDto } from './dto/create-diary.dto';
import * as path from 'path';
import { Student } from './entities/student.entity';
import { AssessmentDetail } from './entities/assessmentDetail.entity';
import * as dayjs from 'dayjs';
import * as fs from 'fs';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import pino from 'pino';
import { PinoLogger } from 'util/logger';
@Injectable()
export class DiaryService {
  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
    @InjectRepository(DiaryDetail)
    private diaryDetailRepository: Repository<DiaryDetail>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(AssessmentDetail)
    private readonly assessmentDetailRepository: Repository<AssessmentDetail>,
  ) {}

  findAll(student_id: string) {
    return this.diaryRepository.find({
      where: {
        student_id: student_id,
      },
      relations: ['Detail', 'StudentDiary'],
    });
  }

  findOne(date: string, id: string) {
    return this.diaryRepository.findOne({
      where: { diary_date: date, student_id: id },
      relations: ['Detail'],
    });
  }

  findOneId(id: any, student_id: string) {
    return this.diaryRepository.findOne({
      where: { id: id, student_id: student_id },
      relations: ['Detail'],
    });
  }

  findById(id: any) {
    return this.diaryRepository.find({
      where: {
        student_id: id,
        time_in: Not(IsNull()),
        time_out: Not(IsNull()),
      },
      relations: ['Detail', 'StudentDiary'],
      order: { diary_date: 'DESC' },
    });
  }

  async create(createDiaryDto: CreateDiaryDto, student_id: string) {
    try {
      const diary = await this.diaryRepository.findOne({
        where: {
          diary_date: createDiaryDto.diary_date,
          student_id: student_id,
        },
      });
      if (diary !== null) {
        return diary;
      }
      if (diary === null) {
        const newDetail = new DiaryDetail();
        const newDiary = new Diary();
        newDiary.diary_date = createDiaryDto.diary_date;
        newDiary.student_id = student_id;
        newDiary.Detail = newDetail;
        return await this.diaryRepository.manager.save(newDiary);
      }
    } catch (error) {
      return error;
    }
  }

  async update(date: any, createDiaryDto: CreateDiaryDto, student_id: string) {
    const dateSelect = await this.diaryRepository.findOne({
      where: { diary_date: date, student_id: student_id },
      relations: ['Detail'],
    });
    dateSelect.time_in = createDiaryDto.time_in;
    dateSelect.time_out = createDiaryDto.time_out;
    dateSelect.diary_comment = createDiaryDto.diary_comment;
    dateSelect.diary_comment2 = createDiaryDto.diary_comment2;
    const findDetail = await this.diaryDetailRepository.findOne({
      where: { id: parseInt(dateSelect.diary_detail_id) },
    });
    findDetail.detail_text = createDiaryDto.detail_text;

    await this.diaryDetailRepository.update(findDetail.id, findDetail);
    return await this.diaryRepository.update(dateSelect.id, dateSelect);
  }

  async removeDiary(diaryId, detailId) {
    try {
      const dataDiary = await this.diaryRepository.findOne({
        where: { id: diaryId },
      });
      const dataDetail = await this.diaryDetailRepository.findOne({
        where: { id: detailId },
      });
      if (dataDiary) {
        await this.diaryRepository.remove(dataDiary);
        await this.diaryDetailRepository.remove(dataDetail);
        return { success: true };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getDataReport(uuid: string) {
    const student = await this.studentRepository
      .createQueryBuilder('s')
      .select([
        `s.id as id`,
        `s.username as username`,
        `s.pwd as pwd`,
        `s.title_name as title_name`,
        `s.fname_TH as fname_TH`,
        `s.lname_TH as lname_TH`,
        `s.fname_EN as fname_EN`,
        `s.lname_EN as lname_EN`,
        `s.student_id as student_id`,
        `s.student_group as student_group`,
        `s.tel as tel`,
        `s.email as email`,
        `s.facebook as facebook`,
        `s.emergency_person_fname as emergency_person_fname`,
        `s.emergency_person_lname as emergency_person_lname`,
        `s.emergency_tel as emergency_tel`,
        `s.id_card as id_card`,
        `s.issue_at as issue_at`,
        `s.issue_date as issue_date`,
        `s.expiry_date as expiry_date`,
        `s.race as race`,
        `s.nationality as nationality`,
        `s.religion as religion`,
        `s.dateofbirth as dateofbirth`,
        `s.age as age`,
        `s.sex as sex`,
        `s.p_height as p_height`,
        `s.p_weight as p_weight`,
        `s.address_id as address_id`,
        `s.status as status`,
        `s.profile_image as profile_image`,
        `address.address_no as address_no`,
        `address.moo as moo`,
        `address.district as district`,
        `address.sub_district as sub_district`,
        `address.road as road`,
        `address.province as province`,
        `address.postal_code as postal_code`,
        `branch.branch_name as branch_name`,
      ])
      .leftJoin('student_address', 'address', 'address.id = s.address_id')
      .leftJoin('branch', 'branch', 'branch.id = s.branch_id')
      .where(`s.uuid = :uuid`, { uuid })
      .getRawOne();
    const diaryData = await this.diaryRepository
      .createQueryBuilder('d')
      .select([
        `d.time_in as time_in`,
        `d.time_out as time_out`,
        `d.diary_date as diary_date`,
        `detail.detail_text as diary_detail`,
        `d.diary_comment as diary_comment`,
        `d.diary_comment2 as diary_comment2`,
      ])
      .leftJoin('diary_detail', 'detail', 'd.diary_detail_id = detail.id')
      .where('d.student_id = :studentId', { studentId: student.id })
      .andWhere('d.time_in IS NOT NULL')
      .andWhere('d.time_out IS NOT NULL')
      .orderBy('d.diary_date', 'ASC')
      .getRawMany();
    const assessmentData = await this.assessmentDetailRepository
      .createQueryBuilder('assessmentDetail')
      .select([
        `header.start_at as start_at`,
        `header.end_at as end_at`,
        `header.yearTerm as year_term`,
        `evaluator1.fname_TH as evfname_TH`,
        `evaluator1.lname_TH as evlname_TH`,
        `evaluator2.fname_TH as ev2fname_TH`,
        `evaluator2.lname_TH as ev2lname_TH`,
        `company.company_name as company_name`,
      ])
      .leftJoin(
        `assessment_header`,
        'header',
        'assessmentDetail.header_id = header.id',
      )
      .leftJoin(
        `users`,
        'evaluator1',
        'assessmentDetail.evaluator1_id = evaluator1.id',
      )
      .leftJoin(
        `users`,
        'evaluator2',
        'assessmentDetail.evaluator2_id = evaluator2.id',
      )
      .leftJoin(
        `company`,
        'company',
        'assessmentDetail.company_id = company.id',
      )
      .where(`assessmentDetail.student_id = :studentId`, {
        studentId: student.id,
      })
      .andWhere(`header.status = :status`, { status: '1' })
      .getRawOne();
    const studentData = {};
    const formattedDiaryData = diaryData.map((entry) => ({
      diary_date: dayjs(entry.diary_date).format('DD/MM/YYYY'),
      time_in: entry.time_in || '................',
      time_out: entry.time_out || '................',
      fname_TH: student.fname_TH ? student.fname_TH : '..................',
      lname_TH: student.lname_TH ? student.lname_TH : '..................',
      company_name: assessmentData.company_name
        ? assessmentData.company_name
        : '..............................',
      diary_detail:
        entry.diary_detail !== `<p><br></p>` ? entry.diary_detail : null,
      diary_comment: entry.diary_comment || null,
      diary_comment2: entry.diary_comment2 || null,
    }));
    const parts = assessmentData.year_term.split('/');
    const year = parts[1];
    Object.assign(studentData, {
      term_year: year || '.............',
      title_name: student.title_name || '........',
      fname_TH: student.fname_TH || '...................',
      lname_TH: student.lname_TH || '...................',
      student_id: student.student_id
        ? student.student_id
        : '...................',
      student_group: student.student_group ? student.student_group : '........',
      tel: student.tel ? student.tel : '...................',
      email: student.email ? student.email : '...................',
      facebook: student.facebook ? student.facebook : '...................',
      emergency_person_fname: student.emergency_person_fname
        ? student.emergency_person_fname
        : '...................',
      emergency_person_lname: student.emergency_person_lname
        ? student.emergency_person_lname
        : '...................',
      emergency_tel: student.emergency_tel ? student.emergency_tel : '........',
      id_card: student.id_card ? student.id_card : '...................',
      issue_at: student.issue_at ? student.issue_at : '........',
      issue_date: student.issue_date
        ? dayjs(student.issue_date).format('DD/MM/YYYY')
        : '........',
      expiry_date: student.expiry_date
        ? dayjs(student.expiry_date).format('DD/MM/YYYY')
        : '........',
      race: student.race ? student.race : '........',
      nationality: student.nationality ? student.nationality : '........',
      religion: student.religion ? student.religion : '........',
      dateofbirth: student.dateofbirth
        ? dayjs(student.dateofbirth).format('DD/MM/YYYY')
        : '........',
      age: student.dateofbirth
        ? new Date().getFullYear() - new Date(student.dateofbirth).getFullYear()
        : '........',
      sex: student.sex
        ? student.sex === 'male'
          ? 'ชาย'
          : student.sex === 'female'
          ? 'หญิง'
          : '........'
        : '........',
      p_height: student.p_height ? student.p_height : '........',
      p_weight: student.p_weight ? student.p_weight : '........',
      address_no: student.address_no ? student.address_no : '........',
      moo: student.moo ? student.moo : '........',
      district: student.district ? student.district : '........',
      sub_district: student.sub_district ? student.sub_district : '........',
      road: student.road ? student.road : '........',
      province: student.province ? student.province : '........',
      postal_code: student.postal_code ? student.postal_code : '........',
      branch_name: student.branch_name ? student.branch_name : '........',
      diaryData: formattedDiaryData,
      images: `${process.env.CWIE_API_URL}/Diary/uploads/image2.png`,
    });
    return studentData;
  }

  async generatePdf(htmlTemplate: string, data: any) {
    try {
      const template = await handlebars.compile(htmlTemplate);
      this.logger.debug(`Generating PDF ${process.env.CH_PATH} `);
      const html = await template(data);
      const pathExecute = await path.join(
        process.cwd(),
        process.env.CHROME_PATH,
      );
      const browser = await puppeteer.launch({
        executablePath: pathExecute,
        headless: true,
        args: ['--no-sandbox'],
      });
      const page = await browser.newPage();
      await page.setContent(html, data);
      const printOptions = {
        printBackground: true,
        margin: {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm',
        },
      };
      this.logger.debug('printOptions');
      const pdfBuffer = await page.pdf(printOptions);
      await browser.close();
      return pdfBuffer;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async deleteImage(path) {
    try {
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
