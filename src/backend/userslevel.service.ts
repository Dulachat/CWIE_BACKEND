/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userLevel } from './entities/users_level.entity';

@Injectable()
export class UserslevelService { 
    constructor(@InjectRepository(userLevel)
    private usersLevelRepository:Repository<userLevel>
    ){}

    findAll(){
        return this.usersLevelRepository.find();
    }
}
