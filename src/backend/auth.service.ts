import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { StudentService } from './student.service';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly studentService: StudentService,
  ) {}

  async findAuth(username: any) {
    const checkStudent = await this.studentService.findAuth(username);
    if (!checkStudent) {
      //   console.log(checkStudent)
      return this.usersService.findAuth(username);
    }
    return checkStudent;
  }

  async findOne(data) {
    const checkStudent = await this.studentService.findOneAuth(
      data.id,
      data.username,
    );
    //console.log(data)
    if (!checkStudent) {
      return this.usersService.findOneAuth(data.id, data.username);
    }
    return checkStudent;
  }

  async verifiedPassword(username: string, email: string) {
    const salt = await bcrypt.genSalt();
    const checkStudent = await this.studentService.checkPassword(
      username,
      email,
    );
    if (!checkStudent) {
      //user
      const checkUser = await this.usersService.checkPassword(username, email);
      if (checkUser) {
        return {
          token: salt,
          type: 'user',
          uuid: checkUser.uuid,
        };
      } else {
        return {
          status: 200,
          type: 'user',
        };
      }
    } else if (checkStudent) {
      //student
      return {
        token: salt,
        type: 'student',
        uuid: checkStudent.uuid,
      };
    } else {
      return {
        status: 200,
        type: 'student',
      };
    }
  }

  async resetPassword(
    password: string,
    token: string,
    uuid: string,
    type: string,
  ) {
    if (type === 'user') {
      return this.usersService.resetPassword(password, token, uuid);
    }
    if (type === 'student') {
      return this.studentService.resetPassword(password, token, uuid);
    }
  }
}
