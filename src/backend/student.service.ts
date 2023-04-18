

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { studentAddress } from './entities/studentaddress.entity';
import { Student } from './entities/student.entity';
import * as bcrypt from 'bcrypt';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AssessmentDetail } from './entities/assessmentDetail.entity';
import { find } from 'rxjs';
import { table } from 'console';
import { Diary } from './entities/diary.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private StudentRepository: Repository<Student>,
        @InjectRepository(studentAddress)
        private StudentAddressRepository: Repository<studentAddress>,
        @InjectRepository(AssessmentDetail)
        private readonly assessmentDetailRepository: Repository<AssessmentDetail>,
    ) { }

    findAll() {
        return this.StudentRepository.find({
            relations: ["address", "branchJoin", "Diary"]
        });
    }

    findOne(id: number): Promise<Student> {
        return this.StudentRepository.findOne({
            where: { id: id },
            relations: ["address"]

        });

    }
    findIntern() {
        return this.StudentRepository.find({
            where: { waitings_status: "0" },
            relations: ["address"]
        });

    }

    async findByListDiary(data) {

        if (data.company_id != 'null') {
             //  console.log("พี่เลี้ยง")
            const dataDetail = await this.assessmentDetailRepository.find({
                where: { company_id: data.company_id },
                relations: { JoinStudent: true, JoinCompany: true, JoinEvaluator1: true, JoinEvaluator2: true },
            })
            for (let i in dataDetail) {
                let stuData = await this.StudentRepository.findOne({
                    where: { id: dataDetail[i].student_id },
                    relations: ["branchJoin", "address","Diary"]

                })
                //     console.log(stuData)
                dataDetail[i].JoinStudent = stuData
            }
            return dataDetail
        } else if (data.company_id === "null") {
              // console.log("อาจารย์")
            const dataDetail = await this.assessmentDetailRepository.find({
                where: { evaluator1_id: data.userId },
                relations: { JoinStudent: true, JoinCompany: true, JoinEvaluator1: true, JoinEvaluator2: true },
            })
            //  console.log(dataDetail)
            for (let item of dataDetail) {
                let stuData = await this.StudentRepository.findOne({
                    where: { id: (item.student_id), waitings_status: "1" },
                    relations: ["branchJoin", "address","Diary"]

                })
                item.JoinStudent = stuData
            }

            return dataDetail
        }





    }


    findOneAuth(id: number, username: string): Promise<Student> {
        return this.StudentRepository.findOne({
            where: {
                id: id,
                username: username
            },
            relations: ["address"]

        });

    }

    async findAuth(condition: any): Promise<Student> {
        return await this.StudentRepository.findOne({
            where: { username: condition.username },
            relations: ["address"]
        })
    }
    //updateStudent
    async updateStudent(id: number, updateStudentDto: UpdateStudentDto) {
        //check username and studentId 
        const findId = await this.StudentRepository.findOne({
            where: { id: id },
            relations: ["address"]
        });



        const updateAddress = new studentAddress();
        updateAddress.address_no = updateStudentDto.address_no;
        updateAddress.sub_district = updateStudentDto.sub_district;
        updateAddress.district = updateStudentDto.district;
        updateAddress.moo = updateStudentDto.moo;
        updateAddress.province = updateStudentDto.province;
        updateAddress.road = updateStudentDto.road;
        updateAddress.postal_code = updateStudentDto.postal_code;
        await this.StudentAddressRepository.update(findId.address_id, updateAddress)

        const updateStudentData = new Student();
        updateStudentData.username = updateStudentDto.username;
        updateStudentData.fname_TH = updateStudentDto.fname_TH;
        updateStudentData.lname_TH = updateStudentDto.lname_TH;
        updateStudentData.fname_EN = updateStudentDto.fname_EN;
        updateStudentData.lname_EN = updateStudentDto.lname_EN;
        updateStudentData.student_id = updateStudentDto.student_id;
        updateStudentData.student_group = updateStudentDto.student_group;
        updateStudentData.branch_id = updateStudentDto.branch_id;
        updateStudentData.tel = updateStudentDto.tel;
        updateStudentData.email = updateStudentDto.email;
        updateStudentData.facebook = updateStudentDto.facebook;
        updateStudentData.emergency_person_fname = updateStudentDto.emergency_person_fname;
        updateStudentData.emergency_person_lname = updateStudentDto.emergency_person_lname;
        updateStudentData.emergency_tel = updateStudentDto.emergency_tel;
        updateStudentData.id_card = updateStudentDto.id_card;
        updateStudentData.issue_at = updateStudentDto.issue_at;
        updateStudentData.issue_date = updateStudentDto.issue_date;
        updateStudentData.expiry_date = updateStudentDto.expiry_date;
        updateStudentData.race = updateStudentDto.race;
        updateStudentData.nationality = updateStudentDto.nationality;
        updateStudentData.religion = updateStudentDto.religion;
        updateStudentData.dateofbirth = updateStudentDto.dateofbirth;
        updateStudentData.age = updateStudentDto.age;
        updateStudentData.sex = updateStudentDto.sex;
        updateStudentData.p_height = updateStudentDto.p_height;
        updateStudentData.p_weight = updateStudentDto.p_weight;


        return await this.StudentRepository.update(id, updateStudentData)
    }

    async updateStudentIntern(id: number, updateStudentDto: UpdateStudentDto) {
        //check username and studentId 
        const findId = await this.StudentRepository.findOne({
            where: { id: id },
            relations: ["address"]
        });

        const assDetail = await this.assessmentDetailRepository.findOne({
            where: { student_id: findId.id },
            relations: ["JoinEvaluator2"]

        })
        assDetail.evaluator2_id = updateStudentDto.evaluator2_id;
        await this.assessmentDetailRepository.update(assDetail.id, assDetail)
        console.log(assDetail);
        const updateAddress = new studentAddress();
        updateAddress.address_no = updateStudentDto.address_no;
        updateAddress.sub_district = updateStudentDto.sub_district;
        updateAddress.district = updateStudentDto.district;
        updateAddress.moo = updateStudentDto.moo;
        updateAddress.province = updateStudentDto.province;
        updateAddress.road = updateStudentDto.road;
        updateAddress.postal_code = updateStudentDto.postal_code;
        await this.StudentAddressRepository.update(findId.address_id, updateAddress)

        const updateStudentData = new Student();
        updateStudentData.username = updateStudentDto.username;
        updateStudentData.fname_TH = updateStudentDto.fname_TH;
        updateStudentData.lname_TH = updateStudentDto.lname_TH;
        updateStudentData.fname_EN = updateStudentDto.fname_EN;
        updateStudentData.lname_EN = updateStudentDto.lname_EN;
        updateStudentData.student_id = updateStudentDto.student_id;
        updateStudentData.student_group = updateStudentDto.student_group;
        updateStudentData.branch_id = updateStudentDto.branch_id;
        updateStudentData.tel = updateStudentDto.tel;
        updateStudentData.email = updateStudentDto.email;
        updateStudentData.facebook = updateStudentDto.facebook;
        updateStudentData.emergency_person_fname = updateStudentDto.emergency_person_fname;
        updateStudentData.emergency_person_lname = updateStudentDto.emergency_person_lname;
        updateStudentData.emergency_tel = updateStudentDto.emergency_tel;
        updateStudentData.id_card = updateStudentDto.id_card;
        updateStudentData.issue_at = updateStudentDto.issue_at;
        updateStudentData.issue_date = updateStudentDto.issue_date;
        updateStudentData.expiry_date = updateStudentDto.expiry_date;
        updateStudentData.race = updateStudentDto.race;
        updateStudentData.nationality = updateStudentDto.nationality;
        updateStudentData.religion = updateStudentDto.religion;
        updateStudentData.dateofbirth = updateStudentDto.dateofbirth;
        updateStudentData.age = updateStudentDto.age;
        updateStudentData.sex = updateStudentDto.sex;
        updateStudentData.p_height = updateStudentDto.p_height;
        updateStudentData.p_weight = updateStudentDto.p_weight;


        return await this.StudentRepository.update(id, updateStudentData)
    }
    //addStudent
    async create(createStudentDto: CreateStudentDto) {
        //check username and studentId 
        const check = await this.StudentRepository.findOne({
            where: { username: createStudentDto.username, student_id: createStudentDto.student_id }
        })
        if (check != null) {
            return "error"
        } if (check == null) {
            const Address = new studentAddress();
            await this.StudentRepository.manager.save(Address)
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(createStudentDto.pwd, salt);
            const StudentData = new Student();
            StudentData.username = createStudentDto.username;
            StudentData.pwd = hashedPassword;
            StudentData.title_name = createStudentDto.title_name;
            StudentData.fname_TH = createStudentDto.fname_TH;
            StudentData.lname_TH = createStudentDto.lname_TH;
            StudentData.student_id = createStudentDto.student_id;
            StudentData.student_group = createStudentDto.student_group;
            StudentData.branch_id = createStudentDto.branch_id;
            StudentData.tel = createStudentDto.tel;
            StudentData.email = createStudentDto.email;
            StudentData.address = Address;
            await this.StudentRepository.manager.save(StudentData)
            return "success";
        }

    }

    //delete a student

    async remove(id: number) {
        const removeStudent = await this.StudentRepository.findOne({
            where: { id: id },
            relations: ["address"]
        });
        return await this.StudentRepository.manager.remove(removeStudent)
    }

}

