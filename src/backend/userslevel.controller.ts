/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { UserslevelService } from './userslevel.service';

@Controller('usersLevel')
export class UserslevelController { 
    constructor(
        private readonly userLevelService:UserslevelService){}

    @Get('all')
    findAll(){
        return this.userLevelService.findAll();
    }

}
