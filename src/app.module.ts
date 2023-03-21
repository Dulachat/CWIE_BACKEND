import { UserslevelModule } from './backend/userslevel.module';
import { UsersModule } from './backend/users.module';
import { UsersController } from './backend/users.controller';
import { CompanyModule } from './backend/company.module';
import { CompanyController } from './backend/company.controller';
import { BranchModule } from './backend/branch.module';

import { StudentModule } from './backend/student.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './backend/entities/student.entity';
import 'dotenv/config'
import { studentAddress } from './backend/entities/studentaddress.entity';
import { Branch } from './backend/entities/branch.entity';
import { Company } from './backend/entities/company.entity';
import { Dairy } from './backend/entities/dairy.entity';
import { Users } from './backend/entities/users.entity';
import { userLevel } from './backend/entities/users_level.entity';


@Module({
  imports: [
    UserslevelModule,
    UsersModule,
    CompanyModule,
    BranchModule,
    StudentModule, TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Student, studentAddress, Branch, Company, Dairy, Users, userLevel],
      synchronize: true,
    })],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }
