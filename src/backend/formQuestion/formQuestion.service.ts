import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formQuestion } from '../entities/formQuestionnaire';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-formQusetion.dto';
import { Student } from '../entities/student.entity';

@Injectable()
export class FormQuestionService {
    constructor(
        @InjectRepository(formQuestion)
        private readonly formQuestionRepository: Repository<formQuestion>,
    ) { }

    async createFormQuestion(createQuestionDto: CreateQuestionDto) {
        const findQuestion = await this.formQuestionRepository.findOne({
            where: {
                student_id: createQuestionDto.student_id,
            },
        });
        if (findQuestion !== null) {
            return {
                status: 203,
                message: 'มีข้อมูลแล้ว',
            };
        } else {
            createQuestionDto.student_id = createQuestionDto.student_id;
            this.formQuestionRepository.save(createQuestionDto);
            return {
                status: 200,
                message: 'success',
            };
        }
    }

    findAll() {
        return this.formQuestionRepository.find({
            relations: ['student'],
        });
    }

    async getSummary(body) {
        try {
            const summaryQuery = await this.formQuestionRepository
                .createQueryBuilder('fq')
                .select([
                    `"1-1" AS question1_1,
            COUNT(CASE
                      WHEN f_a1 = 1 THEN 1
                  END) AS f_a1_1,
            COUNT(CASE
                      WHEN f_a1 = 2 THEN 1
                  END) AS f_a1_2,
            COUNT(CASE
                      WHEN f_a1 = 3 THEN 1
                  END) AS f_a1_3,
            COUNT(CASE
                      WHEN f_a1 = 4 THEN 1
                  END) AS f_a1_4,
            COUNT(CASE
                      WHEN f_a1 = 5 THEN 1
                  END) AS f_a1_5,
            "1-2" AS question1_2,
            COUNT(CASE
                      WHEN f_a2 = 1 THEN 1
                  END) AS f_a2_1,
            COUNT(CASE
                      WHEN f_a2 = 2 THEN 1
                  END) AS f_a2_2,
            COUNT(CASE
                      WHEN f_a2 = 3 THEN 1
                  END) AS f_a2_3,
            COUNT(CASE
                      WHEN f_a2 = 4 THEN 1
                  END) AS f_a2_4,
            COUNT(CASE
                      WHEN f_a2 = 5 THEN 1
                  END) AS f_a2_5,
            "1-3" AS question1_3,
            COUNT(CASE
                      WHEN f_a3 = 1 THEN 1
                  END) AS f_a3_1,
            COUNT(CASE
                      WHEN f_a3 = 2 THEN 1
                  END) AS f_a3_2,
            COUNT(CASE
                      WHEN f_a3 = 3 THEN 1
                  END) AS f_a3_3,
            COUNT(CASE
                      WHEN f_a3 = 4 THEN 1
                  END) AS f_a3_4,
            COUNT(CASE
                      WHEN f_a3 = 5 THEN 1
                  END) AS f_a3_5,
            "1-4" AS question1_4,
            COUNT(CASE
                      WHEN f_a4 = 1 THEN 1
                  END) AS f_a4_1,
            COUNT(CASE
                      WHEN f_a4 = 2 THEN 1
                  END) AS f_a4_2,
            COUNT(CASE
                      WHEN f_a4 = 3 THEN 1
                  END) AS f_a4_3,
            COUNT(CASE
                      WHEN f_a4 = 4 THEN 1
                  END) AS f_a4_4,
            COUNT(CASE
                      WHEN f_a4 = 5 THEN 1
                  END) AS f_a4_5,
            "1-5" AS question1_5,
            COUNT(CASE
                      WHEN f_a5 = 1 THEN 1
                  END) AS f_a5_1,
            COUNT(CASE
                      WHEN f_a5 = 2 THEN 1
                  END) AS f_a5_2,
            COUNT(CASE
                      WHEN f_a5 = 3 THEN 1
                  END) AS f_a5_3,
            COUNT(CASE
                      WHEN f_a5 = 4 THEN 1
                  END) AS f_a5_4,
            COUNT(CASE
                      WHEN f_a5 = 5 THEN 1
                  END) AS f_a5_5,
            "2-1" AS question2_1,
            COUNT(CASE
                      WHEN f_f1 = 1 THEN 1
                  END) AS f_f1_1,
            COUNT(CASE
                      WHEN f_f1 = 2 THEN 1
                  END) AS f_f1_2,
            COUNT(CASE
                      WHEN f_f1 = 3 THEN 1
                  END) AS f_f1_3,
            COUNT(CASE
                      WHEN f_f1 = 4 THEN 1
                  END) AS f_f1_4,
            COUNT(CASE
                      WHEN f_f1 = 5 THEN 1
                  END) AS f_f1_5,
            "2-2" AS question2_2,
            COUNT(CASE
                      WHEN f_f2 = 1 THEN 1
                  END) AS f_f2_1,
            COUNT(CASE
                      WHEN f_f2 = 2 THEN 1
                  END) AS f_f2_2,
            COUNT(CASE
                      WHEN f_f2 = 3 THEN 1
                  END) AS f_f2_3,
            COUNT(CASE
                      WHEN f_f2 = 4 THEN 1
                  END) AS f_f2_4,
            COUNT(CASE
                      WHEN f_f2 = 5 THEN 1
                  END) AS f_f2_5,
            "2-3" AS question2_3,
            COUNT(CASE
                      WHEN f_f3 = 1 THEN 1
                  END) AS f_f3_1,
            COUNT(CASE
                      WHEN f_f3 = 2 THEN 1
                  END) AS f_f3_2,
            COUNT(CASE
                      WHEN f_f3 = 3 THEN 1
                  END) AS f_f3_3,
            COUNT(CASE
                      WHEN f_f3 = 4 THEN 1
                  END) AS f_f3_4,
            COUNT(CASE
                      WHEN f_f3 = 5 THEN 1
                  END) AS f_f3_5,
            "2-4" AS question2_4,
            COUNT(CASE
                      WHEN f_f4 = 1 THEN 1
                  END) AS f_f4_1,
            COUNT(CASE
                      WHEN f_f4 = 2 THEN 1
                  END) AS f_f4_2,
            COUNT(CASE
                      WHEN f_f4 = 3 THEN 1
                  END) AS f_f4_3,
            COUNT(CASE
                      WHEN f_f4 = 4 THEN 1
                  END) AS f_f4_4,
            COUNT(CASE
                      WHEN f_f4 = 5 THEN 1
                  END) AS f_f4_5,
            "3-1" AS question3_1,
            COUNT(CASE
                      WHEN f_c1 = 1 THEN 1
                  END) AS f_c1_1,
            COUNT(CASE
                      WHEN f_c1 = 2 THEN 1
                  END) AS f_c1_2,
            COUNT(CASE
                      WHEN f_c1 = 3 THEN 1
                  END) AS f_c1_3,
            COUNT(CASE
                      WHEN f_c1 = 4 THEN 1
                  END) AS f_c1_4,
            COUNT(CASE
                      WHEN f_c1 = 5 THEN 1
                  END) AS f_c1_5,
            "3-2" AS question3_2,
            COUNT(CASE
                      WHEN f_c2 = 1 THEN 1
                  END) AS f_c2_1,
            COUNT(CASE
                      WHEN f_c2 = 2 THEN 1
                  END) AS f_c2_2,
            COUNT(CASE
                      WHEN f_c2 = 3 THEN 1
                  END) AS f_c2_3,
            COUNT(CASE
                      WHEN f_c2 = 4 THEN 1
                  END) AS f_c2_4,
            COUNT(CASE
                      WHEN f_c2 = 5 THEN 1
                  END) AS f_c2_5,
            "3-3" AS question3_3,
            COUNT(CASE
                      WHEN f_c3 = 1 THEN 1
                  END) AS f_c3_1,
            COUNT(CASE
                      WHEN f_c3 = 2 THEN 1
                  END) AS f_c3_2,
            COUNT(CASE
                      WHEN f_c3 = 3 THEN 1
                  END) AS f_c3_3,
            COUNT(CASE
                      WHEN f_c3 = 4 THEN 1
                  END) AS f_c3_4,
            COUNT(CASE
                      WHEN f_c3 = 5 THEN 1
                  END) AS f_c3_5,
            "3-4" AS question3_4,
            COUNT(CASE
                      WHEN f_c4 = 1 THEN 1
                  END) AS f_c4_1,
            COUNT(CASE
                      WHEN f_c4 = 2 THEN 1
                  END) AS f_c4_2,
            COUNT(CASE
                      WHEN f_c4 = 3 THEN 1
                  END) AS f_c4_3,
            COUNT(CASE
                      WHEN f_c4 = 4 THEN 1
                  END) AS f_c4_4,
            COUNT(CASE
                      WHEN f_c4 = 5 THEN 1
                  END) AS f_c4_5,
            "3-5" AS question3_5,
            COUNT(CASE
                      WHEN f_c5 = 1 THEN 1
                  END) AS f_c5_1,
            COUNT(CASE
                      WHEN f_c5 = 2 THEN 1
                  END) AS f_c5_2,
            COUNT(CASE
                      WHEN f_c5 = 3 THEN 1
                  END) AS f_c5_3,
            COUNT(CASE
                      WHEN f_c5 = 4 THEN 1
                  END) AS f_c5_4,
            COUNT(CASE
                      WHEN f_c5 = 5 THEN 1
                  END) AS f_c5_5,
            "4-1" AS question4_1,
            COUNT(CASE
                      WHEN f_fa1 = 1 THEN 1
                  END) AS f_fa1_1,
            COUNT(CASE
                      WHEN f_fa1 = 2 THEN 1
                  END) AS f_fa1_2,
            COUNT(CASE
                      WHEN f_fa1 = 3 THEN 1
                  END) AS f_fa1_3,
            COUNT(CASE
                      WHEN f_fa1 = 4 THEN 1
                  END) AS f_fa1_4,
            COUNT(CASE
                      WHEN f_fa1 = 5 THEN 1
                  END) AS f_fa1_5,
            "4-2" AS question4_2,
            COUNT(CASE
                      WHEN f_fa2 = 1 THEN 1
                  END) AS f_fa2_1,
            COUNT(CASE
                      WHEN f_fa2 = 2 THEN 1
                  END) AS f_fa2_2,
            COUNT(CASE
                      WHEN f_fa2 = 3 THEN 1
                  END) AS f_fa2_3,
            COUNT(CASE
                      WHEN f_fa2 = 4 THEN 1
                  END) AS f_fa2_4,
            COUNT(CASE
                      WHEN f_fa2 = 5 THEN 1
                  END) AS f_fa2_5,
            "4-3" AS question4_3,
            COUNT(CASE
                      WHEN f_fa3 = 1 THEN 1
                  END) AS f_fa3_1,
            COUNT(CASE
                      WHEN f_fa3 = 2 THEN 1
                  END) AS f_fa3_2,
            COUNT(CASE
                      WHEN f_fa3 = 3 THEN 1
                  END) AS f_fa3_3,
            COUNT(CASE
                      WHEN f_fa3 = 4 THEN 1
                  END) AS f_fa3_4,
            COUNT(CASE
                      WHEN f_fa3 = 5 THEN 1
                  END) AS f_fa3_5,
            "5-1" AS question5_1,
            COUNT(CASE
                      WHEN f_s1 = 1 THEN 1
                  END) AS f_s1_1,
            COUNT(CASE
                      WHEN f_s1 = 2 THEN 1
                  END) AS f_s1_2,
            COUNT(CASE
                      WHEN f_s1 = 3 THEN 1
                  END) AS f_s1_3,
            COUNT(CASE
                      WHEN f_s1 = 4 THEN 1
                  END) AS f_s1_4,
            COUNT(CASE
                      WHEN f_s1 = 5 THEN 1
                  END) AS f_s1_5,
            "5-2" AS question5_2,
            COUNT(CASE
                      WHEN f_s2 = 1 THEN 1
                  END) AS f_s2_1,
            COUNT(CASE
                      WHEN f_s2 = 2 THEN 1
                  END) AS f_s2_2,
            COUNT(CASE
                      WHEN f_s2 = 3 THEN 1
                  END) AS f_s2_3,
            COUNT(CASE
                      WHEN f_s2 = 4 THEN 1
                  END) AS f_s2_4,
            COUNT(CASE
                      WHEN f_s2 = 5 THEN 1
                  END) AS f_s2_5,
            "5-3" AS question5_3,
            COUNT(CASE
                      WHEN f_s3 = 1 THEN 1
                  END) AS f_s3_1,
            COUNT(CASE
                      WHEN f_s3 = 2 THEN 1
                  END) AS f_s3_2,
            COUNT(CASE
                      WHEN f_s3 = 3 THEN 1
                  END) AS f_s3_3,
            COUNT(CASE
                      WHEN f_s3 = 4 THEN 1
                  END) AS f_s3_4,
            COUNT(CASE
                      WHEN f_s3 = 5 THEN 1
                  END) AS f_s3_5,
            "5-4" AS question5_4,
            COUNT(CASE
                      WHEN f_s4 = 1 THEN 1
                  END) AS f_s4_1,
            COUNT(CASE
                      WHEN f_s4 = 2 THEN 1
                  END) AS f_s4_2,
            COUNT(CASE
                      WHEN f_s4 = 3 THEN 1
                  END) AS f_s4_3,
            COUNT(CASE
                      WHEN f_s4 = 4 THEN 1
                  END) AS f_s4_4,
            COUNT(CASE
                      WHEN f_s4 = 5 THEN 1
                  END) AS f_s4_5,
            "5-5" AS question5_5,
            COUNT(CASE
                      WHEN f_s5 = 1 THEN 1
                  END) AS f_s5_1,
            COUNT(CASE
                      WHEN f_s5 = 2 THEN 1
                  END) AS f_s5_2,
            COUNT(CASE
                      WHEN f_s5 = 3 THEN 1
                  END) AS f_s5_3,
            COUNT(CASE
                      WHEN f_s5 = 4 THEN 1
                  END) AS f_s5_4,
            COUNT(CASE
                      WHEN f_s5 = 5 THEN 1
                  END) AS f_s5_5`,
                ]);
            if (body) {
                summaryQuery.where(` year(fq.createAt) = :createAt`, {
                    createAt: body.year,
                });
            }
            const data = await summaryQuery.getRawMany();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllFormQuestions(page?: number, limit?: number, academicYear?: string) {
        try {
            // สร้าง query builder สำหรับรองรับ academicYear filter
            let queryBuilder = this.formQuestionRepository
                .createQueryBuilder('fq')
                .leftJoinAndSelect('fq.student', 'student')
                .orderBy('fq.id', 'ASC');

            // เพิ่ม filter ตาม academicYear (ค้นหารหัสนักศึกษาที่ขึ้นต้นด้วยปีการศึกษา)
            if (academicYear && academicYear.trim()) {
                // แปลงปีการศึกษาเป็นรูปแบบ 2 หลัก (เช่น 2564 -> 64)
                const yearSuffix = academicYear.trim().slice(-2);
                queryBuilder.andWhere('student.student_id LIKE :yearPrefix', {
                    yearPrefix: `${yearSuffix}%`
                });
            }

            // ถ้าไม่มี page และ limit ให้ดึงข้อมูลทั้งหมด
            if (!page || !limit) {
                const allData = await queryBuilder.getMany();

                // คำนวณ summary statistics
                const summary = await this.calculateSummary();

                // แปลงข้อมูลให้ตรงกับ format ที่ต้องการ
                const formattedData = allData.map(item => ({
                    id: item.id.toString(),
                    student_id: item.student.student_id,
                    student_info: item.student ? {
                        username: item.student.username,
                        title_name: item.student.title_name,
                        fname_TH: item.student.fname_TH,
                        lname_TH: item.student.lname_TH,
                        fname_EN: item.student.fname_EN,
                        lname_EN: item.student.lname_EN,
                        student_group: item.student.student_group,
                        tel: item.student.tel,
                        email: item.student.email,
                        sex: item.student.sex,
                        year_class: item.student.year_class,
                        branch_id: item.student.branch_id
                    } : null,
                    old_school: item.old_school,
                    district: item.district,
                    province: item.province,
                    school_type: item.school_type,
                    grade: item.grade,
                    parents_occupation: item.parents_occupation,
                    earnings: item.earnings,
                    f_academy: item.f_academy?.toString() || '0',
                    f_a1: item.f_a1?.toString() || '0',
                    f_a2: item.f_a2?.toString() || '0',
                    f_a3: item.f_a3?.toString() || '0',
                    f_a4: item.f_a4?.toString() || '0',
                    f_a5: item.f_a5?.toString() || '0',
                    f_finance: item.f_finance?.toString() || '0',
                    f_f1: item.f_f1?.toString() || '0',
                    f_f2: item.f_f2?.toString() || '0',
                    f_f3: item.f_f3?.toString() || '0',
                    f_f4: item.f_f4?.toString() || '0',
                    course: item.f_course?.toString() || '0',
                    c1: item.f_c1?.toString() || '0',
                    c2: item.f_c2?.toString() || '0',
                    c3: item.f_c3?.toString() || '0',
                    c4: item.f_c4?.toString() || '0',
                    c5: item.f_c5?.toString() || '0',
                    family: item.f_family?.toString() || '0',
                    fa1: item.f_fa1?.toString() || '0',
                    fa2: item.f_fa2?.toString() || '0',
                    fa3: item.f_fa3?.toString() || '0',
                    society: item.f_society?.toString() || '0',
                    s1: item.f_s1?.toString() || '0',
                    s2: item.f_s2?.toString() || '0',
                    s3: item.f_s3?.toString() || '0',
                    s4: item.f_s4?.toString() || '0',
                    s5: item.f_s5?.toString() || '0',
                    f_public_relation: item.f_public_relation || '',
                    createdAt: item.createAt?.toISOString() || new Date().toISOString(),
                    updatedAt: item.createAt?.toISOString() || new Date().toISOString()
                }));

                return {
                    success: true,
                    message: 'ดึงข้อมูลสำเร็จ',
                    data: formattedData,
                    pagination: null,
                    summary
                };
            }

            // คำนวณ offset สำหรับ pagination
            const offset = (page - 1) * limit;

            // ดึงข้อมูลพร้อม pagination
            const [data, total] = await queryBuilder
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            // คำนวณ total pages
            const totalPages = Math.ceil(total / limit);

            // คำนวณ summary statistics
            const summary = await this.calculateSummary();

            // แปลงข้อมูลให้ตรงกับ format ที่ต้องการ
            const formattedData = data.map(item => ({
                id: item.id.toString(),
                student_id: item.student.student_id,
                student_info: item.student ? {
                    username: item.student.username,
                    title_name: item.student.title_name,
                    fname_TH: item.student.fname_TH,
                    lname_TH: item.student.lname_TH,
                    fname_EN: item.student.fname_EN,
                    lname_EN: item.student.lname_EN,
                    student_group: item.student.student_group,
                    tel: item.student.tel,
                    email: item.student.email,
                    sex: item.student.sex,
                    year_class: item.student.year_class,
                    branch_id: item.student.branch_id
                } : null,
                old_school: item.old_school,
                district: item.district,
                province: item.province,
                school_type: item.school_type,
                grade: item.grade,
                parents_occupation: item.parents_occupation,
                earnings: item.earnings,
                f_academy: item.f_academy?.toString() || '0',
                f_a1: item.f_a1?.toString() || '0',
                f_a2: item.f_a2?.toString() || '0',
                f_a3: item.f_a3?.toString() || '0',
                f_a4: item.f_a4?.toString() || '0',
                f_a5: item.f_a5?.toString() || '0',
                f_finance: item.f_finance?.toString() || '0',
                f_f1: item.f_f1?.toString() || '0',
                f_f2: item.f_f2?.toString() || '0',
                f_f3: item.f_f3?.toString() || '0',
                f_f4: item.f_f4?.toString() || '0',
                course: item.f_course?.toString() || '0',
                c1: item.f_c1?.toString() || '0',
                c2: item.f_c2?.toString() || '0',
                c3: item.f_c3?.toString() || '0',
                c4: item.f_c4?.toString() || '0',
                c5: item.f_c5?.toString() || '0',
                family: item.f_family?.toString() || '0',
                fa1: item.f_fa1?.toString() || '0',
                fa2: item.f_fa2?.toString() || '0',
                fa3: item.f_fa3?.toString() || '0',
                society: item.f_society?.toString() || '0',
                s1: item.f_s1?.toString() || '0',
                s2: item.f_s2?.toString() || '0',
                s3: item.f_s3?.toString() || '0',
                s4: item.f_s4?.toString() || '0',
                s5: item.f_s5?.toString() || '0',
                f_public_relation: item.f_public_relation || '',
                createdAt: item.createAt?.toISOString() || new Date().toISOString(),
                updatedAt: item.createAt?.toISOString() || new Date().toISOString()
            }));

            return {
                success: true,
                message: 'ดึงข้อมูลสำเร็จ',
                data: formattedData,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages
                },
                summary
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getStatistics() {
        try {
            // ข้อมูลภาพรวม
            const overview = await this.getOverviewStatistics();

            // การกระจายของโรงเรียน
            const schoolDistribution = await this.getSchoolDistribution();

            // การกระจายของเกรด
            const gradeDistribution = await this.getGradeDistribution();

            // การกระจายของอาชีพ
            const occupationDistribution = await this.getOccupationDistribution();

            // การวิเคราะห์คะแนน
            const scoreAnalysis = await this.getScoreAnalysis();

            return {
                success: true,
                message: 'ดึงสถิติสำเร็จ',
                data: {
                    overview,
                    schoolDistribution,
                    gradeDistribution,
                    occupationDistribution,
                    scoreAnalysis
                }
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async searchFormQuestions(
        search?: string,
        page?: number,
        limit: number = 10,
        schoolType?: string,
        academicYear?: string
    ) {
        try {
            // สร้าง query builder
            const queryBuilder = this.formQuestionRepository
                .createQueryBuilder('fq')
                .leftJoinAndSelect('fq.student', 'student')
                .orderBy('fq.id', 'ASC');

            // เพิ่ม search conditions ถ้ามี search parameter
            if (search && search.trim()) {
                const searchTerm = `%${search.trim()}%`;
                queryBuilder.andWhere(
                    '(fq.old_school LIKE :search OR fq.district LIKE :search OR fq.province LIKE :search OR student.student_id LIKE :search)',
                    { search: searchTerm }
                );
            }

            // เพิ่ม filter ตาม schoolType
            if (schoolType) {
                queryBuilder.andWhere('fq.school_type = :schoolType', { schoolType });
            }

            // เพิ่ม filter ตาม academicYear (ค้นหารหัสนักศึกษาที่ขึ้นต้นด้วยปีการศึกษา)
            if (academicYear && academicYear.trim()) {
                // แปลงปีการศึกษาเป็นรูปแบบ 2 หลัก (เช่น 2564 -> 64)
                const yearSuffix = academicYear.trim().slice(-2);
                queryBuilder.andWhere('student.student_id LIKE :yearPrefix', {
                    yearPrefix: `${yearSuffix}%`
                });
            }

            // ถ้าไม่มี page parameter ให้ดึงข้อมูลทั้งหมด
            if (!page) {
                const allData = await queryBuilder.getMany();

                // คำนวณ summary statistics จากข้อมูลที่ search ได้
                const summary = await this.calculateSearchSummary(allData);

                // แปลงข้อมูลให้ตรงกับ format ที่ต้องการ
                const formattedData = allData.map(item => this.formatFormQuestionData(item));

                return {
                    success: true,
                    message: 'ค้นหาข้อมูลสำเร็จ',
                    data: formattedData,
                    pagination: null,
                    summary
                };
            }

            // คำนวณ offset สำหรับ pagination
            const offset = (page - 1) * limit;

            // ดึงข้อมูลพร้อม pagination
            const [data, total] = await queryBuilder
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            // คำนวณ total pages
            const totalPages = Math.ceil(total / limit);

            // คำนวณ summary statistics จากข้อมูลที่ search ได้
            const summary = await this.calculateSearchSummary(data);

            // แปลงข้อมูลให้ตรงกับ format ที่ต้องการ
            const formattedData = data.map(item => this.formatFormQuestionData(item));

            return {
                success: true,
                message: 'ค้นหาข้อมูลสำเร็จ',
                data: formattedData,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                },
                summary
            };

        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการค้นหา: ${error.message}`);
        }
    }

    private formatFormQuestionData(item: any) {
        return {
            id: item.id.toString(),
            student_id: item.student?.student_id || 'ไม่ระบุ',
            student_info: item.student ? {
                username: item.student.username,
                title_name: item.student.title_name,
                fname_TH: item.student.fname_TH,
                lname_TH: item.student.lname_TH,
                fname_EN: item.student.fname_EN,
                lname_EN: item.student.lname_EN,
                student_group: item.student.student_group,
                tel: item.student.tel,
                email: item.student.email,
                sex: item.student.sex,
                year_class: item.student.year_class,
                branch_id: item.student.branch_id
            } : null,
            old_school: item.old_school || 'ไม่ระบุ',
            district: item.district || 'ไม่ระบุ',
            province: item.province || 'ไม่ระบุ',
            school_type: item.school_type || 'ไม่ระบุ',
            grade: item.grade || 'ไม่ระบุ',
            parents_occupation: item.parents_occupation || 'ไม่ระบุ',
            earnings: item.earnings || 'ไม่ระบุ',
            f_academy: item.f_academy?.toString() || '0',
            f_a1: item.f_a1?.toString() || '0',
            f_a2: item.f_a2?.toString() || '0',
            f_a3: item.f_a3?.toString() || '0',
            f_a4: item.f_a4?.toString() || '0',
            f_a5: item.f_a5?.toString() || '0',
            f_finance: item.f_finance?.toString() || '0',
            f_f1: item.f_f1?.toString() || '0',
            f_f2: item.f_f2?.toString() || '0',
            f_f3: item.f_f3?.toString() || '0',
            f_f4: item.f_f4?.toString() || '0',
            course: item.f_course?.toString() || '0',
            c1: item.f_c1?.toString() || '0',
            c2: item.f_c2?.toString() || '0',
            c3: item.f_c3?.toString() || '0',
            c4: item.f_c4?.toString() || '0',
            c5: item.f_c5?.toString() || '0',
            family: item.f_family?.toString() || '0',
            fa1: item.f_fa1?.toString() || '0',
            fa2: item.f_fa2?.toString() || '0',
            fa3: item.f_fa3?.toString() || '0',
            society: item.f_society?.toString() || '0',
            s1: item.f_s1?.toString() || '0',
            s2: item.f_s2?.toString() || '0',
            s3: item.f_s3?.toString() || '0',
            s4: item.f_s4?.toString() || '0',
            s5: item.f_s5?.toString() || '0',
            f_public_relation: item.f_public_relation || '',
            createdAt: item.createAt?.toISOString() || new Date().toISOString(),
            updatedAt: item.createAt?.toISOString() || new Date().toISOString()
        };
    }

    private async calculateSearchSummary(data: any[]) {
        try {
            if (!data || data.length === 0) {
                return {
                    totalResults: 0,
                    schoolTypeDistribution: {},
                    provinceDistribution: {},
                    districtDistribution: {},
                    gradeDistribution: {},
                    averageScores: {
                        academy: 0,
                        finance: 0,
                        course: 0,
                        family: 0,
                        society: 0
                    }
                };
            }

            // นับจำนวนผลลัพธ์ทั้งหมด
            const totalResults = data.length;

            // การกระจายของประเภทโรงเรียน
            const schoolTypeDistribution = data.reduce((acc, item) => {
                const type = item.school_type || 'ไม่ระบุ';
                acc[type] = (acc[type] || 0) + 1;
                return acc;
            }, {});

            // การกระจายของจังหวัด
            const provinceDistribution = data.reduce((acc, item) => {
                const province = item.province || 'ไม่ระบุ';
                acc[province] = (acc[province] || 0) + 1;
                return acc;
            }, {});

            // การกระจายของอำเภอ
            const districtDistribution = data.reduce((acc, item) => {
                const district = item.district || 'ไม่ระบุ';
                acc[district] = (acc[district] || 0) + 1;
                return acc;
            }, {});

            // การกระจายของเกรด
            const gradeDistribution = data.reduce((acc, item) => {
                const grade = item.grade || 'ไม่ระบุ';
                acc[grade] = (acc[grade] || 0) + 1;
                return acc;
            }, {});

            // คำนวณคะแนนเฉลี่ย
            const validScores = data.filter(item =>
                item.f_academy && item.f_finance && item.f_course && item.f_family && item.f_society
            );

            let averageScores = {
                academy: 0,
                finance: 0,
                course: 0,
                family: 0,
                society: 0
            };

            if (validScores.length > 0) {
                averageScores = {
                    academy: Math.round((validScores.reduce((sum, item) => sum + (item.f_academy || 0), 0) / validScores.length) * 100) / 100,
                    finance: Math.round((validScores.reduce((sum, item) => sum + (item.f_finance || 0), 0) / validScores.length) * 100) / 100,
                    course: Math.round((validScores.reduce((sum, item) => sum + (item.f_course || 0), 0) / validScores.length) * 100) / 100,
                    family: Math.round((validScores.reduce((sum, item) => sum + (item.f_family || 0), 0) / validScores.length) * 100) / 100,
                    society: Math.round((validScores.reduce((sum, item) => sum + (item.f_society || 0), 0) / validScores.length) * 100) / 100
                };
            }

            return {
                totalResults,
                schoolTypeDistribution,
                provinceDistribution,
                districtDistribution,
                gradeDistribution,
                averageScores
            };

        } catch (error) {
            return {
                totalResults: 0,
                schoolTypeDistribution: {},
                provinceDistribution: {},
                districtDistribution: {},
                gradeDistribution: {},
                averageScores: {
                    academy: 0,
                    finance: 0,
                    course: 0,
                    family: 0,
                    society: 0
                }
            };
        }
    }

    private async calculateSummary() {
        try {
            // นับจำนวนนักเรียนทั้งหมด
            const totalStudents = await this.formQuestionRepository.count();

            // นับจำนวนโรงเรียนรัฐบาล vs เอกชน
            const governmentSchools = await this.formQuestionRepository.count({
                where: { school_type: '1' }
            });
            const privateSchools = await this.formQuestionRepository.count({
                where: { school_type: '2' }
            });

            // นับจำนวนนักเรียนที่มีเกรดสูง
            const highGrades = await this.formQuestionRepository.count({
                where: { grade: '3.51 ขึ้นไป' }
            });

            // คำนวณคะแนนเฉลี่ยของแต่ละหมวด
            const avgScores = await this.formQuestionRepository
                .createQueryBuilder('fq')
                .select([
                    'AVG(fq.f_academy) as avg_academy',
                    'AVG(fq.f_finance) as avg_finance',
                    'AVG(fq.f_course) as avg_course',
                    'AVG(fq.f_family) as avg_family',
                    'AVG(fq.f_society) as avg_society'
                ])
                .getRawOne();

            return {
                totalStudents,
                governmentSchools,
                privateSchools,
                highGrades,
                averageScores: {
                    academy: Math.round(avgScores.avg_academy * 100) / 100 || 0,
                    finance: Math.round(avgScores.avg_finance * 100) / 100 || 0,
                    course: Math.round(avgScores.avg_course * 100) / 100 || 0,
                    family: Math.round(avgScores.avg_family * 100) / 100 || 0,
                    society: Math.round(avgScores.avg_society * 100) / 100 || 0
                }
            };
        } catch (error) {
            return {
                totalStudents: 0,
                governmentSchools: 0,
                privateSchools: 0,
                highGrades: 0,
                averageScores: {
                    academy: 0,
                    finance: 0,
                    course: 0,
                    family: 0,
                    society: 0
                }
            };
        }
    }

    private async getOverviewStatistics() {
        try {
            const totalStudents = await this.formQuestionRepository.count();

            const governmentSchools = await this.formQuestionRepository.count({
                where: { school_type: '1' }
            });

            const privateSchools = await this.formQuestionRepository.count({
                where: { school_type: '2' }
            });

            const highGrades = await this.formQuestionRepository.count({
                where: { grade: '3.51 ขึ้นไป' }
            });

            // คำนวณข้อมูลเดือนนี้และเดือนที่แล้ว
            const now = new Date();
            const thisMonth = now.getMonth();
            const thisYear = now.getFullYear();

            const thisMonthStart = new Date(thisYear, thisMonth, 1);
            const thisMonthEnd = new Date(thisYear, thisMonth + 1, 1);
            const lastMonthStart = new Date(thisYear, thisMonth - 1, 1);

            const thisMonthCount = await this.formQuestionRepository
                .createQueryBuilder('fq')
                .where('fq.createAt >= :start AND fq.createAt < :end', {
                    start: thisMonthStart,
                    end: thisMonthEnd
                })
                .getCount();

            const lastMonthCount = await this.formQuestionRepository
                .createQueryBuilder('fq')
                .where('fq.createAt >= :start AND fq.createAt < :end', {
                    start: lastMonthStart,
                    end: thisMonthStart
                })
                .getCount();

            return {
                totalStudents,
                governmentSchools,
                privateSchools,
                highGrades,
                thisMonth: thisMonthCount,
                lastMonth: lastMonthCount
            };
        } catch (error) {
            return {
                totalStudents: 0,
                governmentSchools: 0,
                privateSchools: 0,
                highGrades: 0,
                thisMonth: 0,
                lastMonth: 0
            };
        }
    }

    private async getSchoolDistribution() {
        try {
            const schools = await this.formQuestionRepository
                .createQueryBuilder('fq')
                .select([
                    'fq.old_school as school',
                    'COUNT(*) as count'
                ])
                .groupBy('fq.old_school')
                .orderBy('count', 'DESC')
                .limit(10)
                .getRawMany();

            const total = await this.formQuestionRepository.count();

            return schools.map(school => ({
                school: school.school,
                count: parseInt(school.count),
                percentage: Math.round((parseInt(school.count) / total) * 1000) / 10
            }));
        } catch (error) {
            return [];
        }
    }

    private async getGradeDistribution() {
        try {
            const grades = await this.formQuestionRepository
                .createQueryBuilder('fq')
                .select([
                    'fq.grade as grade',
                    'COUNT(*) as count'
                ])
                .groupBy('fq.grade')
                .orderBy('count', 'DESC')
                .getRawMany();

            const total = await this.formQuestionRepository.count();

            return grades.map(grade => ({
                grade: grade.grade,
                count: parseInt(grade.count),
                percentage: Math.round((parseInt(grade.count) / total) * 1000) / 10
            }));
        } catch (error) {
            return [];
        }
    }

    private async getOccupationDistribution() {
        try {
            const occupations = await this.formQuestionRepository
                .createQueryBuilder('fq')
                .select([
                    'fq.parents_occupation as occupation',
                    'COUNT(*) as count'
                ])
                .groupBy('fq.parents_occupation')
                .orderBy('count', 'DESC')
                .limit(10)
                .getRawMany();

            const total = await this.formQuestionRepository.count();

            return occupations.map(occupation => ({
                occupation: occupation.occupation,
                count: parseInt(occupation.count),
                percentage: Math.round((parseInt(occupation.count) / total) * 1000) / 10
            }));
        } catch (error) {
            return [];
        }
    }

    private async getScoreAnalysis() {
        try {
            // คำนวณสถิติของแต่ละหมวด
            const academyStats = await this.getScoreCategoryStats('f_academy');
            const financeStats = await this.getScoreCategoryStats('f_finance');
            const courseStats = await this.getScoreCategoryStats('f_course');
            const familyStats = await this.getScoreCategoryStats('f_family');
            const societyStats = await this.getScoreCategoryStats('f_society');

            return {
                academy: academyStats,
                finance: financeStats,
                course: courseStats,
                family: familyStats,
                society: societyStats
            };
        } catch (error) {
            return {
                academy: { average: 0, max: 0, min: 0, distribution: [0, 0, 0, 0, 0] },
                finance: { average: 0, max: 0, min: 0, distribution: [0, 0, 0, 0, 0] },
                course: { average: 0, max: 0, min: 0, distribution: [0, 0, 0, 0, 0] },
                family: { average: 0, max: 0, min: 0, distribution: [0, 0, 0, 0, 0] },
                society: { average: 0, max: 0, min: 0, distribution: [0, 0, 0, 0, 0] }
            };
        }
    }

    private async getScoreCategoryStats(field: string) {
        try {
            const stats = await this.formQuestionRepository
                .createQueryBuilder('fq')
                .select([
                    `AVG(fq.${field}) as average`,
                    `MAX(fq.${field}) as max`,
                    `MIN(fq.${field}) as min`,
                    `COUNT(CASE WHEN fq.${field} = 1 THEN 1 END) as score1`,
                    `COUNT(CASE WHEN fq.${field} = 2 THEN 1 END) as score2`,
                    `COUNT(CASE WHEN fq.${field} = 3 THEN 1 END) as score3`,
                    `COUNT(CASE WHEN fq.${field} = 4 THEN 1 END) as score4`,
                    `COUNT(CASE WHEN fq.${field} = 5 THEN 1 END) as score5`
                ])
                .getRawOne();

            return {
                average: Math.round(stats.average * 100) / 100 || 0,
                max: stats.max || 0,
                min: stats.min || 0,
                distribution: [
                    parseInt(stats.score1) || 0,
                    parseInt(stats.score2) || 0,
                    parseInt(stats.score3) || 0,
                    parseInt(stats.score4) || 0,
                    parseInt(stats.score5) || 0
                ]
            };
        } catch (error) {
            return {
                average: 0,
                max: 0,
                min: 0,
                distribution: [0, 0, 0, 0, 0]
            };
        }
    }
}
