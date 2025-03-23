import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { studentAddress } from './entities/studentaddress.entity';
import { Student } from './entities/student.entity';
import * as bcrypt from 'bcrypt';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AssessmentDetail } from './entities/assessmentDetail.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private StudentRepository: Repository<Student>,
    @InjectRepository(studentAddress)
    private StudentAddressRepository: Repository<studentAddress>,
    @InjectRepository(AssessmentDetail)
    private readonly assessmentDetailRepository: Repository<AssessmentDetail>,
  ) {}

  findAll() {
    return this.StudentRepository.find({
      relations: ['address', 'branchJoin', 'Diary'],
    });
  }

  findOne(id: number): Promise<Student> {
    return this.StudentRepository.findOne({
      where: { id: id },
      relations: ['address'],
    });
  }
  findOneID(studentID: string): Promise<Student> {
    return this.StudentRepository.findOne({
      where: { student_id: studentID },
      relations: ['address'],
    });
  }
  findOneUid(uuid: string): Promise<Student> {
    return this.StudentRepository.findOne({
      where: { uuid: uuid },
      relations: ['address'],
    });
  }
  async findIntern() {
    const result = await this.StudentRepository.find({
      where: {
        waitings_status: '0',
        intern_status: '0',
      },
      relations: ['address'],
    });
    return result;
  }

  async findByListDiary(data) {
    const dataQuery = this.assessmentDetailRepository.createQueryBuilder('a');
    if (data.type === 'พี่เลี้ยง') {
      dataQuery
        .where(`a.evaluator2_id = :eva`, {
          eva: data.userId,
        })
        .andWhere(`JoinEvaluator2.company_id = :companyId`, {
          companyId: data.companyId,
        });
    } else {
      dataQuery
        .where(`a.evaluator1_id = :eva`, {
          eva: data.userId,
        })
        .andWhere(`JoinEvaluator1.branch_id = :branchId`, {
          branchId: data.companyId,
        })
        .andWhere(`a.header_id = :headerId`, { headerId: data.headerId });
    }
    const dataDetail = await dataQuery
      .leftJoinAndSelect('a.JoinStudent', 'JoinStudent')
      .leftJoinAndSelect('a.JoinCompany', 'JoinCompany')
      .leftJoinAndSelect('a.JoinEvaluator1', 'JoinEvaluator1')
      .leftJoinAndSelect('a.JoinEvaluator2', 'JoinEvaluator2')
      .getMany();

    for (let item of dataDetail) {
      let stuData = await this.StudentRepository.findOne({
        where: { id: item.student_id },
        relations: ['branchJoin', 'address', 'Diary'],
      });
      item.JoinStudent = stuData;
    }
    return dataDetail;
  }

  findOneAuth(id: number, username: string): Promise<Student> {
    return this.StudentRepository.findOne({
      where: {
        id: id,
        username: username,
      },
      relations: ['address'],
    });
  }

  async findAuth(condition: any): Promise<Student> {
    return await this.StudentRepository.findOne({
      where: { username: condition.username },
      relations: ['address'],
    });
  }
  //updateStudent
  async updateStudent(
    id: number,
    uuid: string,
    updateStudentDto: UpdateStudentDto,
  ) {
    //check username and studentId
    const findId = await this.StudentRepository.findOne({
      where: { id: id },
      relations: ['address'],
    });
    const updateAddress = new studentAddress();
    updateAddress.address_no = updateStudentDto.address_no;
    updateAddress.sub_district = updateStudentDto.sub_district;
    updateAddress.district = updateStudentDto.district;
    updateAddress.moo = updateStudentDto.moo;
    updateAddress.province = updateStudentDto.province;
    updateAddress.road = updateStudentDto.road;
    updateAddress.postal_code = updateStudentDto.postal_code;
    await this.StudentAddressRepository.update(
      findId.address_id,
      updateAddress,
    );
    console.log('student updated');
    const update = await this.StudentRepository.createQueryBuilder()
      .update()
      .set({
        username: updateStudentDto.username,
        fname_TH: updateStudentDto.fname_TH,
        lname_TH: updateStudentDto.lname_TH,
        fname_EN: updateStudentDto.fname_EN,
        lname_EN: updateStudentDto.lname_EN,
        student_id: updateStudentDto.student_id,
        student_group: updateStudentDto.student_group,
        branch_id: updateStudentDto.branch_id,
        tel: updateStudentDto.tel,
        email: updateStudentDto.email,
        facebook: updateStudentDto.facebook,
        emergency_person_fname: updateStudentDto.emergency_person_fname,
        emergency_person_lname: updateStudentDto.emergency_person_lname,
        emergency_tel: updateStudentDto.emergency_tel,
        id_card: updateStudentDto.id_card,
        issue_at: updateStudentDto.issue_at,
        issue_date: updateStudentDto.issue_date,
        expiry_date: updateStudentDto.expiry_date,
        race: updateStudentDto.race,
        nationality: updateStudentDto.nationality,
        religion: updateStudentDto.religion,
        dateofbirth: updateStudentDto.dateofbirth,
        age: updateStudentDto.age,
        sex: updateStudentDto.sex,
        p_height: updateStudentDto.p_height,
        p_weight: updateStudentDto.p_weight,
        year_class: updateStudentDto.year_class,
        intern_status: updateStudentDto.intern_status,
      })
      .where('uuid = :uuid', { uuid: uuid })
      .execute();

    return update;
  }

  async updateStudentIntern(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      //check username and studentId
      const findId = await this.StudentRepository.findOne({
        where: { id: id },
        relations: ['address'],
      });
      const assDetail = await this.assessmentDetailRepository.findOne({
        where: { student_id: id },
        relations: ['JoinEvaluator2'],
      });
      assDetail.evaluator2_id = updateStudentDto.evaluator2_id;
      await this.assessmentDetailRepository.update(assDetail.id, {
        evaluator2_id: updateStudentDto.evaluator2_id,
      });
      await this.StudentAddressRepository.update(findId.address_id, {
        address_no: updateStudentDto.address_no,
        sub_district: updateStudentDto.sub_district,
        district: updateStudentDto.district,
        moo: updateStudentDto.moo,
        province: updateStudentDto.province,
        road: updateStudentDto.road,
        postal_code: updateStudentDto.postal_code,
      });
      const updateStudent = await this.StudentRepository.createQueryBuilder()
        .update()
        .set({
          username: updateStudentDto.username,
          fname_TH: updateStudentDto.fname_TH,
          lname_TH: updateStudentDto.lname_TH,
          fname_EN: updateStudentDto.fname_EN,
          lname_EN: updateStudentDto.lname_EN,
          student_id: updateStudentDto.student_id,
          student_group: updateStudentDto.student_group,
          branch_id: updateStudentDto.branch_id,
          tel: updateStudentDto.tel,
          email: updateStudentDto.email,
          facebook: updateStudentDto.facebook,
          emergency_person_fname: updateStudentDto.emergency_person_fname,
          emergency_person_lname: updateStudentDto.emergency_person_lname,
          emergency_tel: updateStudentDto.emergency_tel,
          id_card: updateStudentDto.id_card,
          issue_at: updateStudentDto.issue_at,
          issue_date: updateStudentDto.issue_date,
          expiry_date: updateStudentDto.expiry_date,
          race: updateStudentDto.race,
          nationality: updateStudentDto.nationality,
          religion: updateStudentDto.religion,
          dateofbirth: updateStudentDto.dateofbirth,
          age: updateStudentDto.age,
          sex: updateStudentDto.sex,
          p_height: updateStudentDto.p_height,
          p_weight: updateStudentDto.p_weight,
          year_class: updateStudentDto.year_class,
          intern_status: updateStudentDto.intern_status,
        })
        .where(`id = :id`, { id })
        .execute();
      return updateStudent;
    } catch (error) {
      throw new Error(error);
    }
  }
  //addStudent
  async create(createStudentDto: CreateStudentDto) {
    //check username and studentId
    const check = await this.StudentRepository.findOne({
      where: {
        username: createStudentDto.username,
        student_id: createStudentDto.student_id,
      },
    });
    let dataObj = '';
    if (check !== null) {
      dataObj = 'error';
    } else if (check === null) {
      const Address = new studentAddress();
      await this.StudentRepository.manager.save(Address);
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
      StudentData.intern_status = createStudentDto.intern_status;
      StudentData.year_class = createStudentDto.year_class;
      await this.StudentRepository.manager.save(StudentData);
      dataObj = 'success';
    }
    return dataObj;
  }

  //delete a student

  async remove(id: number) {
    const removeStudent = await this.StudentRepository.findOne({
      where: { id: id },
      relations: ['address'],
    });
    return await this.StudentRepository.manager.remove(removeStudent);
  }

  async checkPassword(username, email) {
    const student = await this.StudentRepository.findOne({
      where: {
        username: username,
        email: email,
      },
    });
    return student;
  }

  async resetPassword(password: string, token: string, UUID: string) {
    const findStudent = await this.findOneUid(UUID);
    if (findStudent) {
      const hashedPassword = await bcrypt.hash(password, token);
      findStudent.pwd = hashedPassword;
      await this.StudentRepository.update(findStudent.id, findStudent);
      return 'success';
    } else {
      throw new Error();
    }
  }
}
