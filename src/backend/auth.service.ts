import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { StudentService } from './student.service';
import { UsersService } from './users.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly studentService: StudentService,
    ) { }

    async findAuth(username: any) {
        const checkStudent = await this.studentService.findAuth(username)
        if (!checkStudent) {
         //   console.log(checkStudent)
            return this.usersService.findAuth(username)
        }
        return checkStudent

    }

    async findOne(data) {
        const checkStudent = await this.studentService.findOneAuth(data.id, data.username)
        //console.log(data)
        if (!checkStudent) {
            return this.usersService.findOneAuth(data.id, data.username)
        }
        return checkStudent
    }



}