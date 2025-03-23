import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Users } from '../backend/entities/users.entity';
import { Student } from '../backend/entities/student.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Student])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
