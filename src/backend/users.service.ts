import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserAssessment } from './entities/UserAssessment.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(UserAssessment)
    private readonly userAssessmentRepository: Repository<UserAssessment>
  ) { }

  findAll() {
    return this.usersRepository.find({
      relations: ['branchJoinUser', 'userLevelJoin', 'companyJoin'],
    });
  }

  findUserCompany(id: any) {
    return this.usersRepository.find({
      where: { company_id: id },
      relations: ['companyJoin'],
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: ['branchJoinUser', 'userLevelJoin', 'companyJoin'],
    });
  }

  findAuthAssessment(username: string) {
    const userAssessment = this.userAssessmentRepository.findOne({
      where: { username: username },
      relations: ['companyJoin', 'userLevelJoin'],
    });
    return userAssessment
  }

  async findOneUUID(uuid: string) {
    let data = null
    data = await this.usersRepository.findOne({
      where: { uuid: uuid },
      relations: ['branchJoinUser', 'userLevelJoin', 'companyJoin'],
    });
    if (!data) {
      data = await this.userAssessmentRepository.findOne({
        where: { uuid: uuid },
        relations: ['companyJoin', 'userLevelJoin'],
      });

    }
    return data;
  }

  findOneAuth(id: number, username: string) {
    return this.usersRepository.findOne({
      where: {
        id: id,
        username: username,
      },
      relations: ['branchJoinUser', 'userLevelJoin', 'companyJoin'],
    });
  }

  async findAuth(condition: any): Promise<Users> {
    return this.usersRepository.findOne({
      where: { username: condition.username },
    });
  }
  findSelect(branch_id: string) {
    return this.usersRepository.find({
      where: {
        branch_id: branch_id,
      },
    });
  }

  async checkPassword(username, email) {
    const user = await this.usersRepository.findOne({
      where: {
        username: username,
        email: email,
      },
    });
    return user;
  }

  async create(createUsersDto: CreateUsersDto) {
    const check = await this.usersRepository.findOne({
      where: { username: createUsersDto.username },
      relations: ['branchJoinUser', 'userLevelJoin', 'companyJoin'],
    });
    if (check != null) {
      return 'error';
    }
    if (check == null) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUsersDto.pwd, salt);
      createUsersDto.pwd = hashedPassword;
      await this.usersRepository.save(createUsersDto);
      return 'success';
    }
  }

  async update(id: number, updateStudentDto: UpdateUsersDto) {
    const findUser = await this.usersRepository.findOne({
      where: { id: id },
    });
    await this.usersRepository.update(findUser.id, updateStudentDto);
    return 'success';
  }

  async remove(id: number) {
    const removeUser = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['branchJoinUser', 'userLevelJoin', 'companyJoin'],
    });
    return await this.usersRepository.manager.remove(removeUser);
  }

  async resetPassword(password: string, token: string, UUID: string) {
    const findUser = await this.findOneUUID(UUID);
    if (findUser) {
      const hashedPassword = await bcrypt.hash(password, token);
      findUser.pwd = hashedPassword;
      const res = await this.usersRepository.update(findUser.id, findUser);
      return 'success';
    } else {
      return findUser;
    }
  }
}
