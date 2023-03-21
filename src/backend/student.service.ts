

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { studentAddress } from './entities/studentaddress.entity';
import { Student } from './entities/student.entity';
import * as bcrypt from 'bcrypt';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private StudentRepository: Repository<Student>,
        @InjectRepository(studentAddress)
        private StudentAddressRepository: Repository<studentAddress>,
    ) { }

    findAll() {
        return this.StudentRepository.find({
            relations:["address","branchJoin"]
        });
    }

    findOne(id: number): Promise<Student> {
        return this.StudentRepository.findOne({
            where: { id: id },
            relations: ["address"]

        });

    }
    //updateStudent
    async updateStudent(id: number, updateStudentDto: UpdateStudentDto) {

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
    //addStudent
    async create(createStudentDto: CreateStudentDto) {


        const Address = new studentAddress();
        Address.address_no = createStudentDto.address_no;
        Address.sub_district = createStudentDto.sub_district;
        Address.district = createStudentDto.district;
        Address.moo = createStudentDto.moo;
        Address.province = createStudentDto.province;
        Address.road = createStudentDto.road;
        Address.postal_code = createStudentDto.postal_code;
        await this.StudentRepository.manager.save(Address)



        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createStudentDto.pwd, salt);
        const StudentData = new Student();
        StudentData.username = createStudentDto.username;
        StudentData.pwd = hashedPassword;
        StudentData.fname_TH = createStudentDto.fname_TH;
        StudentData.lname_TH = createStudentDto.lname_TH;
        StudentData.fname_EN = createStudentDto.fname_EN;
        StudentData.lname_EN = createStudentDto.lname_EN;
        StudentData.student_id = createStudentDto.student_id;
        StudentData.student_group = createStudentDto.student_group;
        StudentData.branch_id = createStudentDto.branch_id;
        StudentData.tel = createStudentDto.tel;
        StudentData.email = createStudentDto.email;
        StudentData.facebook = createStudentDto.facebook;
        StudentData.emergency_person_fname = createStudentDto.emergency_person_fname;
        StudentData.emergency_person_lname = createStudentDto.emergency_person_lname;
        StudentData.emergency_tel = createStudentDto.emergency_tel;
        StudentData.id_card = createStudentDto.id_card;
        StudentData.issue_at = createStudentDto.issue_at;
        StudentData.issue_date = createStudentDto.issue_date;
        StudentData.expiry_date = createStudentDto.expiry_date;
        StudentData.race = createStudentDto.race;
        StudentData.nationality = createStudentDto.nationality;
        StudentData.religion = createStudentDto.religion;
        StudentData.dateofbirth = createStudentDto.dateofbirth;
        StudentData.age = createStudentDto.age;
        StudentData.sex = createStudentDto.sex;
        StudentData.p_height = createStudentDto.p_height;
        StudentData.p_weight = createStudentDto.p_weight;
        StudentData.address = Address;
        // await this.StudentRepository.manager.save(StudentData)
        return await this.StudentRepository.manager.save(StudentData)
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

