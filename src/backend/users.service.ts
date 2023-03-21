
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from './dto/update-users.dto';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users)
    private usersRepository: Repository<Users>
    ) { }

    findAll() {
        return this.usersRepository.find({
            relations: ["branchJoinUser", "userLevelJoin", "companyJoin"]
        })
    }

    findOne(id: number) {
        return this.usersRepository.findOne({
            where: { id: id },
            relations: ["branchJoinUser", "userLevelJoin", "companyJoin"]
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

        await this.usersRepository.update(id, updateStudentDto);
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
