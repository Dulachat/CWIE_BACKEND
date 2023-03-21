
import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Get("allStudent")
    findAll() {
        return this.studentService.findAll();
    }

    @Get("oneStudent/:id")
    findOne(@Param('id') id: number) {
        return this.studentService.findOne(id);
    }

    @Post('register')
    async create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.create(createStudentDto);
    }

    @Patch('updateStudent/:id')
    update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentService.updateStudent(id, updateStudentDto)
    }

    @Delete('deleteStudent/:id')
    removeStudent(@Param('id') id: number) {
        return this.studentService.remove(id)
    }

}
