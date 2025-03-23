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
  ) {}

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
      relations: ['studentId'],
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
}
