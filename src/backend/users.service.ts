
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) { }

    findAll() {
        return this.usersRepository.find({
            relations: ["branchJoinUser", "userLevelJoin", "companyJoin"]
        })
    }

    findUserCompany(id: any) {
        return this.usersRepository.find({
            where: { company_id: id },
            relations: ["companyJoin"]
        })
    }

    findOne(id: number) {
        return this.usersRepository.findOne({
            where: { id: id },
            relations: ["branchJoinUser", "userLevelJoin", "companyJoin"]
        })
    }
    
    findOneUUID(uuid: string) {
        return this.usersRepository.findOne({
            where: { uuid: uuid },
            relations: ["branchJoinUser", "userLevelJoin", "companyJoin"]
        })
    }

    findOneAuth(id: number, username: string) {
        return this.usersRepository.findOne({
            where: {
                id: id,
                username: username
            },
            relations: ["branchJoinUser", "userLevelJoin", "companyJoin"]
        })
    }

    async findAuth(condition: any): Promise<Users> {
        return this.usersRepository.findOne({
            where: { username: condition.username }
        })
    }
    findSelect(branch_id: string) {
        return this.usersRepository.find({
            where: {
                branch_id: branch_id
            }
        })
    }




    async create(createUsersDto: CreateUsersDto) {
        const check = await this.usersRepository.findOne({
            where: { username: createUsersDto.username },
            relations: ["branchJoinUser", "userLevelJoin", "companyJoin"]
        })
        if (check != null) {
            return "error"
        }
        if (check == null) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(createUsersDto.pwd, salt);
            createUsersDto.pwd = hashedPassword
            await this.usersRepository.save(createUsersDto);
            return "success"
        }


    }

    async update(id: number, updateStudentDto: UpdateUsersDto) {
        const findUser = await this.usersRepository.findOne({
            where: { id: id }
        })
        await this.usersRepository.update(findUser.id, updateStudentDto);
        return "success"
    }

    async remove(id: number) {
        const removeUser = await this.usersRepository.findOne({
            where: { id: id },
            relations: ["branchJoinUser", "userLevelJoin", "companyJoin"]
        });
        return await this.usersRepository.manager.remove(removeUser)
    }
}
