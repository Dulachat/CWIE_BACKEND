import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { FormQuestionService } from './formQuestion.service';
import { CreateQuestionDto } from '../dto/create-formQusetion.dto';

@Controller('formQuestion')
export class FormQuestionController {
  constructor(private formQuestionService: FormQuestionService) {}

  @Post('create')
  async createFormQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      const Question = await this.formQuestionService.createFormQuestion(
        createQuestionDto,
      );
      return Question;
    } catch (error) {
      throw error;
    }
  }
  @Get()
  async findScoreQuestion() {
    try {
      const allQuestion = await this.formQuestionService.findAll();
      return allQuestion;
    } catch (error) {
      throw error;
    }
  }

  @Patch('/summary')
  async getSummaryQuestion(@Body() body) {
    try {
      const data = await this.formQuestionService.getSummary(body);
      if (data) {
        data[0].question1_1 = `1.1 ความมีชื่อเสียงของมหาวิทยาลัยและเป็นที่ยอมรับของสังคม`;
        data[0].question1_2 = `1.2 เป็นมหาวิทยาลัยที่จบออกมาแล้วเป็นที่ยอมรับในตลาดแรงงาน`;
        data[0].question1_3 = `1.3 เป็นมหาวิทยาลัยที่มีความทันสมัยและมีความพร้อมในทุกด้าน`;
        data[0].question1_4 = `1.4 สถานที่ตั้งของมหาวิทยาลัยเดินทางมาเล่าเรียนสะดวกสบาย`;
        data[0].question1_5 = `1.5 นักเรียนมีความปรารถนาที่จะเรียนสาขาที่เลือกในมหาวิทยาลัยนี้ เพราะพ่อ แม่ และผู้ปกครองจบจากมหาวิทยาลัยนี้ หรือ เพื่อนๆ ชักชวน`;
        data[0].question2_1 = `2.1 ค่าธรรมเนียมการศึกษา เช่น ค่าหน่วยกิตและค่าลงทะเบียน มีราคาเหมาะสม`;
        data[0].question2_2 = `2.2 ทุนการศึกษามีผลต่อการตัดสินใจในการเลือกเรียน`;
        data[0].question2_3 = `2.3 ค่าครองชีพเพียงพอจากผู้ปกครองหรือแหล่งทุน`;
        data[0].question2_4 = `2.4 ค่าอาหารจากโรงอาหารหรือร้านค้าอื่นๆในมหาวิทยาลัย`;
        data[0].question3_1 = `3.1 หลักสูตรที่เปิดสอนเป็นที่นิยม และเป็นที่ต้องการของตลาดแรงงาน ในปัจจุบัน`;
        data[0].question3_2 = `3.2 คณาจารย์ประจำหลักสูตรได้รับการยอมรับจากภายนอก`;
        data[0].question3_3 = `3.3 มีห้องเรียนที่ได้มาตรฐานและบรรยากาศดี`;
        data[0].question3_4 = `3.4 ทักษะ ความรู้ และความสามารถที่นักศึกษาเป็นที่ยอมรับ`;
        data[0].question3_5 = `3.5 มีความคาดหวังในโอกาสและอาชีพที่รองรับหลังสำเร็จการศึกษา`;
        data[0].question4_1 = `4.1 รายได้ของครอบครัวเพียงพอต่อการเรียนตลอดหลักสูตร`;
        data[0].question4_2 = `4.2 ครอบครัวสนับสนุนทุกๆด้านของการเข้าศึกษาต่อ`;
        data[0].question4_3 = `4.3 ทุนการศึกษา หรือ สิทธิประโยชน์ ที่คาดว่าจะได้รับ`;
        data[0].question5_1 = `5.1 ความเห็นของเพื่อนในการแนะนำศึกษาต่อ`;
        data[0].question5_2 = `5.2 ความเห็นของคนรักในการแนะนำศึกษาต่อ`;
        data[0].question5_3 = `5.3 ความเห็นของคุณครูในการแนะนำศึกษาต่อ`;
        data[0].question5_4 = `5.4 ความเห็นของครอบครัวในการแนะนำศึกษาต่อ`;
        data[0].question5_5 = `5.5 ความเห็นของมหาวิทยาลัยในการแนะนำศึกษาต่อ`;

        const result = data.map((item) => {
          return [
            {
              question: item.question1_1,
              minimal: item.f_a1_1 ?? '0',
              little: item.f_a1_2 ?? '0',
              middle: item.f_a1_3 ?? '0',
              lots: item.f_a1_4 ?? '0',
              the_most: item.f_a1_5 ?? '0',
            },
            {
              question: item.question1_2,
              minimal: item.f_a2_1 ?? '0',
              little: item.f_a2_2 ?? '0',
              middle: item.f_a2_3 ?? '0',
              lots: item.f_a2_4 ?? '0',
              the_most: item.f_a2_5 ?? '0',
            },
            {
              question: item.question1_3,
              minimal: item.f_a3_1 ?? '0',
              little: item.f_a3_2 ?? '0',
              middle: item.f_a3_3 ?? '0',
              lots: item.f_a3_4 ?? '0',
              the_most: item.f_a3_5 ?? '0',
            },
            {
              question: item.question1_4,
              minimal: item.f_a4_1 ?? '0',
              little: item.f_a4_2 ?? '0',
              middle: item.f_a4_3 ?? '0',
              lots: item.f_a4_4 ?? '0',
              the_most: item.f_a4_5 ?? '0',
            },
            {
              question: item.question1_5,
              minimal: item.f_a5_1 ?? '0',
              little: item.f_a5_2 ?? '0',
              middle: item.f_a5_3 ?? '0',
              lots: item.f_a4_5 ?? '0',
              the_most: item.f_a5_5 ?? '0',
            },
            {
              question: item.question2_1,
              minimal: item.f_f1_1 ?? '0',
              little: item.f_f1_2 ?? '0',
              middle: item.f_f1_3 ?? '0',
              lots: item.f_f1_4 ?? '0',
              the_most: item.f_f1_5 ?? '0',
            },
            {
              question: item.question2_2,
              minimal: item.f_f2_1 ?? '0',
              little: item.f_f2_2 ?? '0',
              middle: item.f_f2_3 ?? '0',
              lots: item.f_f2_4 ?? '0',
              the_most: item.f_f2_5 ?? '0',
            },
            {
              question: item.question2_3,
              minimal: item.f_f3_1 ?? '0',
              little: item.f_f3_2 ?? '0',
              middle: item.f_f3_3 ?? '0',
              lots: item.f_f3_4 ?? '0',
              the_most: item.f_f3_5 ?? '0',
            },
            {
              question: item.question2_4,
              minimal: item.f_f4_1 ?? '0',
              little: item.f_f4_2 ?? '0',
              middle: item.f_f4_3 ?? '0',
              lots: item.f_f4_4 ?? '0',
              the_most: item.f_f4_5 ?? '0',
            },
            {
              question: item.question3_1,
              minimal: item.f_c1_1 ?? '0',
              little: item.f_c1_2 ?? '0',
              middle: item.f_c1_3 ?? '0',
              lots: item.f_c1_4 ?? '0',
              the_most: item.f_c1_5 ?? '0',
            },
            {
              question: item.question3_2,
              minimal: item.f_c2_1 ?? '0',
              little: item.f_c2_2 ?? '0',
              middle: item.f_c2_3 ?? '0',
              lots: item.f_c2_4 ?? '0',
              the_most: item.f_c2_5 ?? '0',
            },
            {
              question: item.question3_3,
              minimal: item.f_c3_1 ?? '0',
              little: item.f_c3_2 ?? '0',
              middle: item.f_c3_3 ?? '0',
              lots: item.f_c3_4 ?? '0',
              the_most: item.f_c3_5 ?? '0',
            },
            {
              question: item.question3_4,
              minimal: item.f_c4_1 ?? '0',
              little: item.f_c4_2 ?? '0',
              middle: item.f_c4_3 ?? '0',
              lots: item.f_c4_4 ?? '0',
              the_most: item.f_c4_5 ?? '0',
            },
            {
              question: item.question3_5,
              minimal: item.f_c5_1 ?? '0',
              little: item.f_c5_2 ?? '0',
              middle: item.f_c5_3 ?? '0',
              lots: item.f_c5_4 ?? '0',
              the_most: item.f_c5_5 ?? '0',
            },
            {
              question: item.question4_1,
              minimal: item.f_fa1_1 ?? '0',
              little: item.f_fa1_2 ?? '0',
              middle: item.f_fa1_3 ?? '0',
              lots: item.f_fa1_4 ?? '0',
              the_most: item.f_fa1_5 ?? '0',
            },
            {
              question: item.question4_2,
              minimal: item.f_fa2_1 ?? '0',
              little: item.f_fa2_2 ?? '0',
              middle: item.f_fa2_3 ?? '0',
              lots: item.f_fa2_4 ?? '0',
              the_most: item.f_fa2_5 ?? '0',
            },
            {
              question: item.question4_3,
              minimal: item.f_fa3_1 ?? '0',
              little: item.f_fa3_2 ?? '0',
              middle: item.f_fa3_3 ?? '0',
              lots: item.f_fa3_4 ?? '0',
              the_most: item.f_fa3_5 ?? '0',
            },
            {
              question: item.question5_1,
              minimal: item.f_s1_1 ?? '0',
              little: item.f_s1_2 ?? '0',
              middle: item.f_s1_3 ?? '0',
              lots: item.f_s1_4 ?? '0',
              the_most: item.f_s1_5 ?? '0',
            },
            {
              question: item.question5_2,
              minimal: item.f_s2_1 ?? '0',
              little: item.f_s2_2 ?? '0',
              middle: item.f_s2_3 ?? '0',
              lots: item.f_s2_4 ?? '0',
              the_most: item.f_s2_5 ?? '0',
            },
            {
              question: item.question5_3,
              minimal: item.f_s3_1 ?? '0',
              little: item.f_s3_2 ?? '0',
              middle: item.f_s3_3 ?? '0',
              lots: item.f_s3_4 ?? '0',
              the_most: item.f_s3_5 ?? '0',
            },
            {
              question: item.question5_4,
              minimal: item.f_s4_1 ?? '0',
              little: item.f_s4_2 ?? '0',
              middle: item.f_s4_3 ?? '0',
              lots: item.f_s4_4 ?? '0',
              the_most: item.f_s4_5 ?? '0',
            },
            {
              question: item.question5_5,
              minimal: item.f_s5_1 ?? '0',
              little: item.f_s5_2 ?? '0',
              middle: item.f_s5_3 ?? '0',
              lots: item.f_s5_4 ?? '0',
              the_most: item.f_s5_5 ?? '0',
            },
          ];
        });

        return {
          success: true,
          message: 'Summary successfully',
          data: result[0],
        };
      } else {
        return {
          success: true,
          message: 'Summary successfully',
          data: [],
        };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
