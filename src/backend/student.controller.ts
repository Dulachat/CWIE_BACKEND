import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('allStudent')
  findAll() {
    return this.studentService.findAll();
  }

  @Get('oneStudent/:id')
  findOne(@Param('id') id: number) {
    return this.studentService.findOne(id);
  }
  @Get('oneStudenID/:studentID')
  findOneID(@Param('studentID') studentID: string) {
    return this.studentService.findOneID(studentID);
  }

  @Get('oneStudentUid/:uuid')
  findOneUid(@Param('uuid') uuid: string) {
    return this.studentService.findOneUid(uuid);
  }

  @Get('allStudentIntern')
  async findOneIntern() {
    const result = await this.studentService.findIntern();
    return result;
  }
  @Get('getByBranch/:userId/:company_id/:type')
  findByListDiary(@Param() param, @Query() query: any) {
    const { userId, company_id, type } = param;
    const { header } = query;
    return this.studentService.findByListDiary({
      userId: userId,
      companyId: company_id,
      type,
      headerId: header,
    });
  }

  @Post('register')
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Patch('updateStudent/:id/:uuid')
  async update(
    @Param('id') id: number,
    @Param('uuid') uuid: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const result = await this.studentService.updateStudent(
        id,
        uuid,
        updateStudentDto,
      );
      return {
        success: true,
        message: 'Student updated successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
  @Patch('updateStudentIntern/:id')
  updateIntern(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudentIntern(id, updateStudentDto);
  }

  @Delete('deleteStudent/:id')
  removeStudent(@Param('id') id: number) {
    return this.studentService.remove(id);
  }
}
