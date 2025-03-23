import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { Student } from 'src/backend/entities/student.entity';
import { Users } from 'src/backend/entities/users.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { unlink } from 'fs';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async updateProfile(body: any) {
    try {
      if (body.userType === 'student') {
        const student = await this.studentRepository.findOne({
          where: {
            uuid: body.uuid,
          },
        });
        if(student.profile_image !== null){
          await this.unlinkImg(`uploads/${student.profile_image}`);
        }
        await this.studentRepository
          .createQueryBuilder()
          .update(Student)
          .set({ profile_image: body.profile })
          .where('uuid=:uuid', { uuid: body.uuid })
          .execute();

        return {
          status: HttpStatus.OK,
          message: 'Profile image was successfully',
        };
      }
      if (body.userType === 'user') {
        const user = await this.usersRepository.findOne({
          where: {
            uuid: body.uuid,
          },
        });
        if(user.profile_image !== null){
          await this.unlinkImg(`uploads/${user.profile_image}`);
        }
        await this.usersRepository
          .createQueryBuilder()
          .update(Users)
          .set({ profile_image: body.profile })
          .where('uuid=:uuid', { uuid: body.uuid })
          .execute();
          return {
            status: HttpStatus.OK,
            message: 'Profile image was successfully',
          };
      }
      throw new UnauthorizedException('You are not allowed');
    } catch (error) {
      throw error;
    }
  }

  async removeImage(uuid: string, userType: string) {
    try {
      if (userType === 'student') {
        await this.studentRepository
          .createQueryBuilder()
          .update(Student)
          .set({ profile_image: null })
          .where('uuid=:uuid', { uuid: uuid })
          .execute();
        return {
          status: HttpStatus.OK,
          message: 'Profile image was successfully',
        };
      }
      if (userType === 'user') {
        await this.usersRepository
          .createQueryBuilder()
          .update(Users)
          .set({ profile_image: null })
          .where('uuid=:uuid', { uuid: uuid })
          .execute();

          return {
            status: HttpStatus.OK,
            message: 'Profile image was successfully',
          };
      }
      throw new UnauthorizedException('You are not allowed');
    } catch (error) {
      throw error;
    }
  }

  async unlinkImg(imagePath: string) {
    unlink(imagePath, async (err) => {
      if (err) {
        console.error('Error deleting image:', err);
      } else {
       
      }
    });
  }
}
